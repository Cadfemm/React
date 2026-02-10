import React from "react";

export default function AnatomyImageOverlayInputs({
  image,
  fields,
  values,
  onChange,
  width,
  height
}) {
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  if (!fields || !Array.isArray(fields)) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Display the image */}
      <img
        src={image}
        alt="Anatomy"
        style={{
          width: width === 'small' ? '30%' : (width || '60%'),
          maxWidth: (width === 'small' || width) ? undefined : 600,
          height: height === 'small' ? '30%' : (height || 'auto'),
          border: '1px solid #ccc',
          borderRadius: 8,
          marginBottom: 20
        }}
      />

      {/* Row of small square inputs below the image, labeled A, B, etc., based on fields */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {fields.map((f, index) => (
          <div key={f.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold', marginBottom: 5 }}>
              {f.label || labels[index] || f.name}
            </label>
            <input
              type="text"
              value={values[f.name] || ''}
              onChange={(e) => onChange(f.name, e.target.value)}
              style={{
                width: 155,
                height: 30,
                border: '1px solid #ccc',
                borderRadius: 4,
                textAlign: 'center',
                fontSize: 14
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

