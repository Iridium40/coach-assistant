import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-heading">Terms and Conditions</CardTitle>
            <p className="text-sm text-optavia-gray">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-optavia-gray mb-4">
                By accessing and using Coaching Amplifier ("the Service"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">2. Use License</h2>
              <p className="text-optavia-gray mb-4">
                Permission is granted to temporarily access the materials on Coaching Amplifier's website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
                this license you may not:
              </p>
              <ul className="list-disc pl-6 text-optavia-gray mb-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on Coaching Amplifier's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">3. User Account</h2>
              <p className="text-optavia-gray mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current
                at all times. You are responsible for safeguarding the password and for all activities that occur under
                your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">4. Data and Privacy</h2>
              <p className="text-optavia-gray mb-4">
                Your use of Coaching Amplifier involves the collection and storage of your personal information,
                including but not limited to your name, email address, profile information, progress data, and preferences.
                We are committed to protecting your privacy as detailed in our Privacy Policy.
              </p>
              <p className="text-optavia-gray mb-4">
                You have the right to request deletion of your account and all associated data at any time. Upon such
                request, we will remove your information from our systems. Please note that deletion of your account and
                data will result in the permanent loss of access to the Service and all associated features, including
                your progress, bookmarks, and saved content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">5. Content and Intellectual Property</h2>
              <p className="text-optavia-gray mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of Coaching Amplifier and its licensors. The Service is protected by copyright, trademark, and
                other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">6. Termination</h2>
              <p className="text-optavia-gray mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">7. Disclaimer</h2>
              <p className="text-optavia-gray mb-4">
                The materials on Coaching Amplifier's website are provided on an 'as is' basis. Coaching Amplifier makes
                no warranties, expressed or implied, and hereby disclaims and negates all other warranties including
                without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">8. Contact Information</h2>
              <p className="text-optavia-gray mb-4">
                If you have any questions about these Terms and Conditions, please contact us through the Service or
                at the contact information provided in our Privacy Policy.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

