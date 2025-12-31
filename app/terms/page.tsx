import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-heading">Terms and Conditions</CardTitle>
            <p className="text-sm text-optavia-gray">Last updated: December 30, 2024</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-optavia-gray mb-4">
                By accessing and using Coaching Amplifier ("the Service"), you accept and agree to be bound by the terms
                and provisions of this agreement. If you do not agree to abide by these terms, please do not use this
                service.
              </p>
            </section>

            <section className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h2 className="text-2xl font-heading font-bold mb-4 text-amber-800">2. Eligibility and Access Restrictions</h2>
              <p className="text-optavia-gray mb-4">
                <strong className="text-amber-800">Coaching Amplifier is exclusively for active OPTAVIA Health Coaches.</strong> By 
                using this Service, you represent and warrant that you are a current, active OPTAVIA Health Coach in good 
                standing with OPTAVIA.
              </p>
              <p className="text-optavia-gray mb-4">
                Access to Coaching Amplifier is by invitation only. <strong className="text-amber-800">You may not invite, share access 
                with, or provide login credentials to any individual who is not an active OPTAVIA Health Coach.</strong> Doing 
                so is a violation of these Terms and may result in immediate termination of your account and access to the Service.
              </p>
              <p className="text-optavia-gray mb-4">
                When inviting other coaches to join the Service, you certify that:
              </p>
              <ul className="list-disc pl-6 text-optavia-gray mb-4 space-y-2">
                <li>The invited individual is an active OPTAVIA Health Coach</li>
                <li>The invited individual is in good standing with OPTAVIA</li>
                <li>You have verified their status as an active coach before sending the invitation</li>
                <li>You understand that you are responsible for ensuring the eligibility of anyone you invite</li>
              </ul>
            </section>

            <section className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-2xl font-heading font-bold mb-4 text-red-800">3. Proprietary Content and Intellectual Property</h2>
              <p className="text-optavia-gray mb-4">
                <strong className="text-red-800">All content within Coaching Amplifier is proprietary and confidential.</strong> This 
                includes, but is not limited to:
              </p>
              <ul className="list-disc pl-6 text-optavia-gray mb-4 space-y-2">
                <li>Training materials, modules, and educational content</li>
                <li>Recipes, meal plans, and nutritional information</li>
                <li>Videos, documents, guides, and resources</li>
                <li>Business strategies, coaching techniques, and methodologies</li>
                <li>Software, design elements, and user interface</li>
                <li>Any other content, data, or materials available through the Service</li>
              </ul>
              <p className="text-optavia-gray mb-4">
                <strong className="text-red-800">Prohibited Activities:</strong> You may NOT:
              </p>
              <ul className="list-disc pl-6 text-optavia-gray mb-4 space-y-2">
                <li>Copy, reproduce, distribute, or share any content from the Service</li>
                <li>Download, save, or store content for use outside the Service</li>
                <li>Share screenshots, recordings, or transcripts of any content</li>
                <li>Use any content for commercial purposes outside of your OPTAVIA coaching activities</li>
                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                <li>Remove, alter, or obscure any copyright, trademark, or proprietary notices</li>
                <li>Share or distribute content to non-OPTAVIA coaches or the general public</li>
                <li>Use content to create competing products, services, or training materials</li>
              </ul>
              <p className="text-optavia-gray mb-4">
                All content, features, and functionality of the Service are and will remain the exclusive property of 
                Coaching Amplifier and its licensors. The Service is protected by copyright, trademark, trade secret, 
                and other intellectual property laws. Unauthorized use of any content may result in legal action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">4. Use License</h2>
              <p className="text-optavia-gray mb-4">
                Permission is granted to access the materials on Coaching Amplifier for personal use in support of your 
                OPTAVIA Health Coaching activities only. This is the grant of a limited, non-exclusive, non-transferable 
                license, not a transfer of title. This license automatically terminates if you violate any of these 
                restrictions or if your status as an active OPTAVIA Health Coach ends.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">5. User Account</h2>
              <p className="text-optavia-gray mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current
                at all times. You are responsible for safeguarding your password and for all activities that occur under
                your account. You may not share your login credentials with anyone else, including other OPTAVIA coaches.
                Each user must have their own account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">6. Data and Privacy</h2>
              <p className="text-optavia-gray mb-4">
                Your use of Coaching Amplifier involves the collection and storage of your personal information,
                including but not limited to your name, email address, OPTAVIA ID, profile information, progress data, 
                and preferences. We are committed to protecting your privacy as detailed in our{" "}
                <Link href="/privacy" className="text-[hsl(var(--optavia-green))] underline hover:text-[hsl(var(--optavia-green-dark))]">
                  Privacy Policy
                </Link>.
              </p>
              <p className="text-optavia-gray mb-4">
                You have the right to request deletion of your account and all associated data at any time. Upon such
                request, we will remove your information from our systems. Please note that deletion of your account and
                data will result in the permanent loss of access to the Service and all associated features, including
                your progress, bookmarks, and saved content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">7. Termination</h2>
              <p className="text-optavia-gray mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                or liability, for any reason whatsoever, including without limitation if you:
              </p>
              <ul className="list-disc pl-6 text-optavia-gray mb-4 space-y-2">
                <li>Breach any of these Terms and Conditions</li>
                <li>Are no longer an active OPTAVIA Health Coach</li>
                <li>Invite or provide access to non-OPTAVIA coaches</li>
                <li>Misuse, copy, or distribute proprietary content</li>
                <li>Share your account credentials with others</li>
                <li>Engage in any activity that harms the Service or other users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">8. Disclaimer</h2>
              <p className="text-optavia-gray mb-4">
                The materials on Coaching Amplifier are provided on an 'as is' basis. Coaching Amplifier makes
                no warranties, expressed or implied, and hereby disclaims and negates all other warranties including
                without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="text-optavia-gray mb-4">
                Coaching Amplifier is an independent resource and is not officially affiliated with, endorsed by, or 
                sponsored by OPTAVIA or Medifast, Inc. The content and training materials are created to support 
                OPTAVIA Health Coaches in their business activities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-optavia-gray mb-4">
                In no event shall Coaching Amplifier, its owners, operators, or affiliates be liable for any indirect, 
                incidental, special, consequential, or punitive damages arising out of or related to your use of the 
                Service. Your sole remedy for dissatisfaction with the Service is to stop using it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-optavia-gray mb-4">
                We reserve the right to modify these Terms and Conditions at any time. We will notify users of any 
                material changes by posting the updated terms on this page with a new "Last updated" date. Your 
                continued use of the Service after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">11. Contact Information</h2>
              <p className="text-optavia-gray mb-4">
                If you have any questions about these Terms and Conditions, please contact us through the Service or
                at the contact information provided in our{" "}
                <Link href="/privacy" className="text-[hsl(var(--optavia-green))] underline hover:text-[hsl(var(--optavia-green-dark))]">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-optavia-gray text-center">
                By using Coaching Amplifier, you acknowledge that you have read, understood, and agree to be bound 
                by these Terms and Conditions.
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link 
            href="/training" 
            className="text-[hsl(var(--optavia-green))] hover:text-[hsl(var(--optavia-green-dark))] underline"
          >
            ← Back to Training
          </Link>
        </div>
      </div>
    </div>
  )
}
