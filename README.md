---
title: Implementasi API Public pada Client - Al-Quran Digital
theme: moon
transition: slide
slideNumber: true
width: 1280
height: 720
margin: 0.02
---

<style>
:root {
	--bg-main: #0f172a;
	--bg-panel: #1e293b;
	--bg-soft: #334155;
	--text-main: #e2e8f0;
	--text-muted: #94a3b8;
	--accent-a: #22d3ee;
	--accent-b: #f59e0b;
	--accent-c: #10b981;
}

.reveal {
	font-size: 30px;
}

.reveal-viewport {
	background:
		radial-gradient(circle at 12% 8%, rgba(34, 211, 238, 0.16), transparent 32%),
		radial-gradient(circle at 88% 88%, rgba(245, 158, 11, 0.14), transparent 35%),
		linear-gradient(140deg, #0b1220 0%, #111827 50%, #0b1220 100%);
}

.reveal .slides {
	width: 100%;
	height: 100%;
}

.reveal h1,
.reveal h2,
.reveal h3 {
	color: var(--text-main);
	letter-spacing: 0.3px;
}

.reveal section {
	box-sizing: border-box;
	padding: 20px 26px;
	background:
		radial-gradient(circle at 12% 8%, rgba(34, 211, 238, 0.2), transparent 32%),
		radial-gradient(circle at 88% 88%, rgba(245, 158, 11, 0.18), transparent 35%),
		linear-gradient(140deg, #0b1220 0%, #111827 50%, #0b1220 100%);
	border-radius: 12px;
}

.subtitle {
	color: var(--text-muted);
	font-size: 0.95em;
}

.panel-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 18px;
	margin-top: 18px;
}

.panel {
	background: linear-gradient(165deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.92));
	border: 1px solid rgba(148, 163, 184, 0.28);
	border-left: 6px solid var(--accent-a);
	border-radius: 14px;
	padding: 16px 18px;
	box-shadow: 0 10px 24px rgba(2, 6, 23, 0.4);
	text-align: left;
}

.panel h4 {
	margin: 0 0 8px;
	font-size: 0.95em;
	color: #f8fafc;
}

.panel ul {
	margin: 0;
	color: var(--text-main);
}

.panel.soft {
	border-left-color: var(--accent-b);
}

.panel.success {
	border-left-color: var(--accent-c);
}

.flow {
	margin-top: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
}

.node {
	background: var(--bg-panel);
	border: 1px solid rgba(148, 163, 184, 0.35);
	color: var(--text-main);
	border-radius: 999px;
	padding: 8px 14px;
	font-size: 0.72em;
}

.arrow {
	color: var(--accent-a);
	font-weight: bold;
}

.mini {
	font-size: 0.7em;
	color: var(--text-muted);
	margin-top: 10px;
}
</style>

## Implementasi API Public pada Client

### WEB Al-Qur'an (React + TypeScript)

<p class="subtitle">Studi kasus: integrasi API, arsitektur client, dan UX yang stabil</p>

---

## Fokus Presentasi

<div class="panel-grid">
	<div class="panel fragment fade-up">
		<h4>Arsitektur</h4>
		<ul>
			<li>Pemisahan peran UI, service, dan data contract</li>
			<li>Alur data yang mudah dijelaskan</li>
		</ul>
	</div>
	<div class="panel soft fragment fade-up">
		<h4>Reliability</h4>
		<ul>
			<li>Loading, error, dan success state terkontrol</li>
			<li>Pengalaman pengguna tetap konsisten</li>
		</ul>
	</div>
</div>

---

## API yang Digunakan

<div class="panel fragment fade-in">
	<h4>Source</h4>
	<p>https://equran.id/api/v2</p>
</div>

<div class="panel-grid">
	<div class="panel fragment fade-up">
		<h4>Endpoint Inti</h4>
		<ul>
			<li>/surat</li>
			<li>/surat/:nomor</li>
			<li>/tafsir/:nomor</li>
		</ul>
	</div>
	<div class="panel success fragment fade-up">
		<h4>Alasan Pemilihan</h4>
		<ul>
			<li>Data terstruktur</li>
			<li>Tanpa autentikasi</li>
			<li>Cocok untuk pembelajaran client-side architecture</li>
		</ul>
	</div>
</div>

---

## Arsitektur Aplikasi

<div class="flow">
	<span class="node fragment fade-in">UI Pages</span>
	<span class="arrow fragment fade-in">→</span>
	<span class="node fragment fade-in">Service Layer</span>
	<span class="arrow fragment fade-in">→</span>
	<span class="node fragment fade-in">Axios Client</span>
	<span class="arrow fragment fade-in">→</span>
	<span class="node fragment fade-in">Public API</span>
</div>

<div class="panel-grid">
	<div class="panel fragment fade-up">
		<h4>Prinsip</h4>
		<ul>
			<li>UI tidak memanggil endpoint secara langsung</li>
			<li>Semua request lewat service layer</li>
		</ul>
	</div>
	<div class="panel soft fragment fade-up">
		<h4>Dampak</h4>
		<ul>
			<li>Kode lebih mudah dirawat</li>
			<li>Refactor lebih aman dengan TypeScript</li>
		</ul>
	</div>
</div>

---

## Struktur Proyek

<div class="panel fragment fade-in">
	<h4>Direktori Kunci</h4>
	<p>src/types • src/services • src/pages • src/components • App.tsx</p>
</div>

<div class="panel-grid">
	<div class="panel fragment fade-up">
		<h4>Tujuan</h4>
		<ul>
			<li>Separation of concerns</li>
			<li>Modul mudah diuji</li>
		</ul>
	</div>
	<div class="panel success fragment fade-up">
		<h4>Keuntungan</h4>
		<ul>
			<li>Skalabel untuk fitur baru</li>
			<li>Kolaborasi tim lebih jelas</li>
		</ul>
	</div>
</div>

---

## Alur Data dan State

<div class="panel-grid">
	<div class="panel fragment fade-up">
		<h4>Alur Data</h4>
		<ul>
			<li>User membuka halaman</li>
			<li>Komponen memicu data fetching</li>
			<li>Service mengambil data API</li>
			<li>UI merender hasil berdasarkan state</li>
		</ul>
	</div>
	<div class="panel soft fragment fade-up">
		<h4>Tiga State Utama</h4>
		<ul>
			<li>loading</li>
			<li>error</li>
			<li>data</li>
		</ul>
	</div>
</div>

---

## Routing dan Validasi

<div class="panel-grid">
	<div class="panel fragment fade-up">
		<h4>Routing</h4>
		<ul>
			<li>/ menampilkan daftar surat</li>
			<li>/surat/:nomor menampilkan detail</li>
			<li>* sebagai fallback route</li>
		</ul>
	</div>
	<div class="panel soft fragment fade-up">
		<h4>Validasi</h4>
		<ul>
			<li>Nomor harus valid</li>
			<li>Out-of-range ditangani sebagai error state</li>
		</ul>
	</div>
</div>

---

## Error Handling Strategy

<div class="panel-grid">
	<div class="panel fragment fade-up">
		<h4>Teknik</h4>
		<ul>
			<li>try/catch pada request</li>
			<li>finally untuk menutup loading</li>
			<li>Pesan error yang informatif</li>
		</ul>
	</div>
	<div class="panel success fragment fade-up">
		<h4>Hasil</h4>
		<ul>
			<li>UI tetap responsif</li>
			<li>Blank screen bisa dihindari</li>
			<li>Interaksi pengguna lebih percaya diri</li>
		</ul>
	</div>
</div>

---

## Penutup

<div class="panel fragment fade-in">
	<h4>Kesimpulan</h4>
	<ul>
		<li>Integrasi API public membutuhkan desain arsitektur yang rapi</li>
		<li>Type safety dan error handling berpengaruh langsung ke kualitas UX</li>
		<li>Pemisahan layer membuat aplikasi lebih siap dikembangkan</li>
	</ul>
</div>
