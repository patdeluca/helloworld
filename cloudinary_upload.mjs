import { v2 as cloudinary } from 'cloudinary';

// ── Step 1: Configure Cloudinary ─────────────────────────────────────────────

cloudinary.config({
  cloud_name: 'do4pbbtra',
  api_key:    '833895728927916',
  api_secret: 'BYyVHV8ilaUmmgIoIICDQFfNNrk',
});

// ── Step 2: Upload a sample image ────────────────────────────────────────────

console.log('Uploading image...');

const uploadResult = await cloudinary.uploader.upload(
  'https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg',
  { public_id: 'my_first_upload' }
);

console.log('\n--- Upload Result ---');
console.log('Secure URL:', uploadResult.secure_url);
console.log('Public ID: ', uploadResult.public_id);

// ── Step 3: Get image details ─────────────────────────────────────────────────

console.log('\n--- Image Metadata ---');
console.log('Width:     ', uploadResult.width, 'px');
console.log('Height:    ', uploadResult.height, 'px');
console.log('Format:    ', uploadResult.format);
console.log('File size: ', uploadResult.bytes, 'bytes');

// ── Step 4: Transform the image ──────────────────────────────────────────────

const transformedUrl = cloudinary.url(uploadResult.public_id, {
  fetch_format: 'auto', // f_auto: serve the best format for the user's browser (e.g. WebP, AVIF)
  quality: 'auto',      // q_auto: automatically pick the best quality/file-size balance
});

console.log('\nDone! Click link below to see optimized version of the image. Check the size and the format.');
console.log('Transformed URL:', transformedUrl);
