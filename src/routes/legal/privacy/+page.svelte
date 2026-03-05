<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Privacy Policy - Terradatum</title>
</svelte:head>

<div class="container mx-auto max-w-3xl px-4 py-12">
	<a
		href="/"
		class="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" />
		Back to Home
	</a>

	<article class="prose prose-slate dark:prose-invert max-w-none">
		<h1>Privacy Policy</h1>
		<p class="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-AU')}</p>

		<h2>1. Introduction</h2>
		<p>
			Terradatum ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
			explains how we collect, use, disclose, and safeguard your information when you use our earth
			resistivity data repository service.
		</p>

		<h2>2. Information We Collect</h2>

		<h3>Personal Information</h3>
		<p>We may collect the following types of personal information:</p>
		<ul>
			<li>
				<strong>Account Information:</strong> Name, email address, and password when you create an account
			</li>
			<li>
				<strong>Profile Information:</strong> Any additional information you choose to provide in your
				profile
			</li>
			<li>
				<strong>Contact Information:</strong> If you contact us, we may collect your email address and
				any information you provide
			</li>
		</ul>

		<h3>Data You Upload</h3>
		<p>When using our Service, you may upload:</p>
		<ul>
			<li>
				<strong>Site Information:</strong> Project site names, addresses, and geolocation coordinates
				(latitude/longitude)
			</li>
			<li>
				<strong>Measurement Data:</strong> Wenner 4-pole earth resistance readings, electrode spacing
				values
			</li>
			<li>
				<strong>Equipment Information:</strong> Make, model, and calibration dates of testing equipment
			</li>
			<li><strong>Attachments:</strong> Photos or documents you upload as evidence</li>
		</ul>

		<h3>Automatically Collected Information</h3>
		<p>We may automatically collect:</p>
		<ul>
			<li>Device information (browser type, operating system)</li>
			<li>Usage data (pages visited, features used)</li>
			<li>IP address and approximate location</li>
		</ul>

		<h2>3. How We Use Your Information</h2>
		<p>We use the information we collect to:</p>
		<ul>
			<li>Provide, maintain, and improve our Service</li>
			<li>Process your data uploads and calculations</li>
			<li>Authenticate your account and provide customer support</li>
			<li>Send you administrative information and updates</li>
			<li>Respond to your comments, questions, and requests</li>
			<li>Analyze usage patterns to improve user experience</li>
			<li>Detect, prevent, and address technical issues and fraudulent activities</li>
		</ul>

		<h2>4. Data Sharing and Disclosure</h2>
		<p>We may share your information in the following circumstances:</p>

		<h3>Service Providers</h3>
		<p>
			We may share your information with third-party vendors, consultants, and other service
			providers who need access to such information to perform services on our behalf (e.g., hosting
			services, data analysis, customer support).
		</p>

		<h3>Legal Requirements</h3>
		<p>
			We may disclose your information when required to do so by law or in response to valid
			requests by public authorities (e.g., court orders, subpoenas).
		</p>

		<h3>Business Transfers</h3>
		<p>
			If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your
			information may be transferred as part of that transaction.
		</p>

		<h2>5. Data Security</h2>
		<p>
			We implement appropriate technical and organizational measures to protect the security of your
			personal information. However, no method of transmission over the Internet or electronic
			storage is 100% secure, and we cannot guarantee absolute security.
		</p>
		<p>We recommend that you use strong passwords and keep your login credentials confidential.</p>

		<h2>6. Data Retention</h2>
		<p>
			We will retain your personal information and uploaded data for as long as your account is
			active or as needed to provide you services. You may request deletion of your data at any time
			by contacting us.
		</p>

		<h2>7. Your Rights</h2>
		<p>Depending on your location, you may have the following rights:</p>
		<ul>
			<li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
			<li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
			<li><strong>Deletion:</strong> Request deletion of your personal information</li>
			<li>
				<strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable
				format
			</li>
			<li><strong>Objection:</strong> Object to processing of your personal information</li>
		</ul>
		<p>To exercise these rights, please contact us at support@terradatum.com.</p>

		<h2>8. Children's Privacy</h2>
		<p>
			Our Service is not intended for use by individuals under the age of 16. We do not knowingly
			collect personal information from children under 16. If you become aware that a child has
			provided us with personal information, please contact us.
		</p>

		<h2>9. Third-Party Links</h2>
		<p>
			Our Service may contain links to third-party websites or services that are not owned or
			controlled by Terradatum. We are not responsible for the privacy practices of these third
			parties.
		</p>

		<h2>10. Changes to This Privacy Policy</h2>
		<p>
			We may update this Privacy Policy from time to time. We will notify you of any changes by
			posting the new Privacy Policy on this page and updating the "Last updated" date. You are
			advised to review this Privacy Policy periodically for any changes.
		</p>

		<h2>11. International Data Transfers</h2>
		<p>
			Your information may be transferred to and maintained on computers located outside of your
			state, province, country, or other governmental jurisdiction where the data protection laws
			may differ from those of your jurisdiction.
		</p>
		<p>By using our Service, you consent to such transfer of your information.</p>

		<h2>12. Contact Information</h2>
		<p>If you have any questions about this Privacy Policy, please contact us:</p>
		<p>
			<strong>Email:</strong> support@terradatum.com<br />
			<strong>Address:</strong> Sydney, NSW, Australia<br />
			<strong>Data Protection Officer:</strong> dpo@terradatum.com
		</p>
	</article>
</div>
