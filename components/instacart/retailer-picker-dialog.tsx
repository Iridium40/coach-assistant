"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, MapPin, Store } from "lucide-react"

type Retailer = {
  id: string
  name: string
  logo_url?: string | null
  address?: string | null
}

const STORAGE_RETAILER_ID = "instacart.retailerId"
const STORAGE_RETAILER_NAME = "instacart.retailerName"

export function getSavedRetailer(): { id: string; name: string } | null {
  if (typeof window === "undefined") return null
  try {
    const id = window.localStorage.getItem(STORAGE_RETAILER_ID) || ""
    const name = window.localStorage.getItem(STORAGE_RETAILER_NAME) || ""
    if (!id || !name) return null
    return { id, name }
  } catch {
    return null
  }
}

export function saveRetailer(retailer: { id: string; name: string }) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_RETAILER_ID, retailer.id)
    window.localStorage.setItem(STORAGE_RETAILER_NAME, retailer.name)
  } catch {
    // ignore
  }
}

interface RetailerPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelected?: (retailer: { id: string; name: string }) => void
}

export function RetailerPickerDialog({ open, onOpenChange, onSelected }: RetailerPickerDialogProps) {
  const { toast } = useToast()
  const [radiusMiles, setRadiusMiles] = useState<number>(10)
  const [loading, setLoading] = useState(false)
  const [retailers, setRetailers] = useState<Retailer[]>([])
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  const saved = useMemo(() => getSavedRetailer(), [open])

  useEffect(() => {
    if (!open) return
    setRetailers([])
    setCoords(null)
  }, [open])

  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not available",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setCoords({ lat, lng })

        try {
          const resp = await fetch("/api/instacart/retailers/nearby", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lng, radiusMiles }),
          })
          const data = await resp.json()
          if (!resp.ok) throw new Error(data?.error || "Failed to load retailers")
          setRetailers(Array.isArray(data?.retailers) ? data.retailers : [])
          if (!Array.isArray(data?.retailers) || data.retailers.length === 0) {
            toast({
              title: "No stores found",
              description: "Try increasing the radius and try again.",
              variant: "destructive",
            })
          }
        } catch (e: any) {
          toast({
            title: "Error",
            description: e?.message || "Couldn't load nearby stores.",
            variant: "destructive",
          })
        } finally {
          setLoading(false)
        }
      },
      () => {
        setLoading(false)
        toast({
          title: "Location permission needed",
          description: "Enable location access to find nearby stores.",
          variant: "destructive",
        })
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    )
  }, [radiusMiles, toast])

  const handleSelectRetailer = useCallback(
    (r: Retailer) => {
      const id = String(r.id)
      const name = r.name || "Selected store"
      saveRetailer({ id, name })
      onSelected?.({ id, name })
      onOpenChange(false)
      toast({ title: "Store selected", description: name })
    },
    [onOpenChange, onSelected, toast]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-optavia-dark">
            <Store className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
            Choose your Instacart store
          </DialogTitle>
          <DialogDescription>
            We'll use your location to find nearby retailers. Your choice is remembered on this device.
          </DialogDescription>
        </DialogHeader>

        {saved && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
            <div className="text-optavia-dark">
              Current store: <span className="font-semibold">{saved.name}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {[5, 10, 25].map((m) => (
              <Button
                key={m}
                type="button"
                variant={radiusMiles === m ? "default" : "outline"}
                size="sm"
                className={
                  radiusMiles === m
                    ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
                    : "border-gray-300"
                }
                onClick={() => setRadiusMiles(m)}
                disabled={loading}
              >
                {m} mi
              </Button>
            ))}
            <div className="ml-auto text-xs text-optavia-gray flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              Radius
            </div>
          </div>

          <Button
            type="button"
            onClick={requestLocation}
            disabled={loading}
            className="w-full gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            {coords ? "Refresh nearby stores" : "Use my location to find stores"}
          </Button>

          <div className="max-h-[320px] overflow-y-auto space-y-2">
            {retailers.map((r) => (
              <button
                key={r.id}
                type="button"
                className="w-full flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-left hover:border-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))] transition-colors"
                onClick={() => handleSelectRetailer(r)}
                disabled={loading}
              >
                <div className="h-10 w-10 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                  {r.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.logo_url} alt={r.name} className="h-10 w-10 object-contain" />
                  ) : (
                    <Store className="h-5 w-5 text-optavia-gray" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-optavia-dark truncate">{r.name}</div>
                  {r.address && <div className="text-xs text-optavia-gray truncate">{r.address}</div>}
                </div>
              </button>
            ))}

            {!loading && coords && retailers.length === 0 && (
              <div className="text-sm text-optavia-gray text-center py-6">
                No stores returned. Try a bigger radius.
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-gray-300">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

