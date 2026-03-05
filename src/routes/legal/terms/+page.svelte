<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';
</script>

<svelte:head>
	<title>Terms of Service - Terradatum</title>
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
		<h1>Terms of Service</h1>
		<p class="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-AU')}</p>

		<h2>1. Acceptance of Terms</h2>
		<p>
			By accessing and using Terradatum ("the Service"), you accept and agree to be bound by the
			terms and provision of this agreement. If you do not agree to abide by these terms, please do
			not use this Service.
		</p>

		<h2>2. Description of Service</h2>
		<p>
			Terradatum is a SaaS platform that provides earth resistivity data storage and visualization
			services for Wenner 4-pole method measurements. The Service allows users to:
		</p>
		<ul>
			<li>Register project sites with geolocation data</li>
			<li>Upload and store earth resistance readings</li>
			<li>Visualize data on interactive maps</li>
			<li>Export data for reporting purposes</li>
		</ul>

		<h2>3. User Accounts and Registration</h2>
		<p>To access certain features of the Service, you must create an account. You agree to:</p>
		<ul>
			<li>Provide accurate and complete registration information</li>
			<li>Maintain the security of your account credentials</li>
			<li>Promptly update any changes to your information</li>
			<li>Accept responsibility for all activities under your account</li>
		</ul>

		<h2>4. Data Ownership and Responsibility</h2>
		<p>
			You retain ownership of all data you upload to Terradatum. By uploading data, you grant us a
			limited license to store and process that data solely for providing the Service to you.
		</p>
		<p>
			You represent and warrant that you have the right to upload any data submitted to the Service
			and that such data does not infringe upon any third-party rights.
		</p>

		<h2>5. Acceptable Use</h2>
		<p>You agree not to use the Service to:</p>
		<ul>
			<li>Upload malicious code, viruses, or harmful content</li>
			<li>Attempt to gain unauthorized access to the Service</li>
			<li>Interfere with the proper operation of the Service</li>
			<li>Use the Service for any unlawful purpose</li>
			<li>Submit false or inaccurate measurement data</li>
		</ul>

		<h2>6. Intellectual Property</h2>
		<p>
			The Service, including its design, functionality, and underlying technology, is protected by
			copyright, trademark, and other intellectual property laws. You may not copy, modify,
			distribute, sell, or lease any part of the Service without our prior written consent.
		</p>

		<h2>7. Disclaimer of Warranties</h2>
		<p>
			THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
			PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
		</p>
		<p>
			We do not warrant that the Service will be uninterrupted, error-free, or completely secure.
		</p>

		<h2>8. Limitation of Liability</h2>
		<p>
			TO THE MAXIMUM EXTENT PERMITTED BY LAW, TERRADATUM SHALL NOT BE LIABLE FOR ANY INDIRECT,
			INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE
			OF THE SERVICE.
		</p>

		<h2>9. Indemnification</h2>
		<p>
			You agree to indemnify, defend, and hold harmless Terradatum and its officers, directors,
			employees, and agents from any claims, damages, liabilities, costs, or expenses arising out of
			your use of the Service or your violation of these Terms.
		</p>

		<h2>10. Termination</h2>
		<p>
			We reserve the right to terminate or suspend your account at any time, with or without notice,
			for any reason, including but not limited to violation of these Terms.
		</p>

		<h2>11. Changes to Terms</h2>
		<p>
			We may modify these Terms at any time. We will provide notice of material changes by posting
			the updated Terms on the Service and updating the "Last updated" date. Your continued use of
			the Service after such changes constitutes acceptance of the new Terms.
		</p>

		<h2>12. Governing Law</h2>
		<p>
			These Terms shall be governed by and construed in accordance with the laws of New South Wales,
			Australia, without regard to its conflict of law provisions.
		</p>

		<h2>13. Contact Information</h2>
		<p>If you have any questions about these Terms, please contact us at:</p>
		<p>
			<strong>Email:</strong> support@terradatum.com<br />
			<strong>Address:</strong> Sydney, NSW, Australia
		</p>
	</article>
</div>
