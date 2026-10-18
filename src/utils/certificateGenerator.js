/**
 * High-resolution HTML5 Canvas Certificate Generator for Pip's Midnight Observatory
 * Renders an official, standalone 1200x840 Junior Dream Engineer Apprentice Certificate.
 */

export function renderCertificateToCanvas(canvas, data) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const {
    nickname = 'Stargazer',
    highScore = 0,
    completedMilestonesCount = 0,
    unlockedCompanions = [],
    favoriteAura = 'Honey Amber (2200K)',
    isGraduated = false,
  } = data;

  const width = 1200;
  const height = 840;
  canvas.width = width;
  canvas.height = height;

  // 1. Deep Midnight Nebula Background
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 650);
  bgGrad.addColorStop(0, '#1c223c');
  bgGrad.addColorStop(0.65, '#131627');
  bgGrad.addColorStop(1, '#0b0d19');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle Constellation Sky Backdrop
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.15)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);

  const starNodes = [
    [120, 140], [220, 100], [310, 160], [420, 120],
    [780, 120], [890, 160], [980, 100], [1080, 140],
    [140, 700], [260, 740], [940, 740], [1060, 700],
  ];

  ctx.beginPath();
  for (let i = 0; i < starNodes.length - 1; i += 2) {
    ctx.moveTo(starNodes[i][0], starNodes[i][1]);
    ctx.lineTo(starNodes[i + 1][0], starNodes[i + 1][1]);
  }
  ctx.stroke();
  ctx.setLineDash([]); // Reset dash

  // Draw tiny twinkling stardust dots
  ctx.fillStyle = 'rgba(255, 248, 241, 0.7)';
  starNodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Ornate Double Golden Filigree Border
  const padOuter = 36;
  const padInner = 48;

  // Outer Gold Border
  ctx.strokeStyle = '#f3c96b';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(padOuter, padOuter, width - padOuter * 2, height - padOuter * 2);

  // Inner Delicate Gold Border
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(padInner, padInner, width - padInner * 2, height - padInner * 2);

  // Corner Star Ornaments (✦)
  ctx.fillStyle = '#f3c96b';
  ctx.font = '24px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦', padInner, padInner);
  ctx.fillText('✦', width - padInner, padInner);
  ctx.fillText('✦', padInner, height - padInner);
  ctx.fillText('✦', width - padInner, height - padInner);

  // 4. Header & Observatory Seal Ribbon
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('MIDNIGHT OBSERVATORY · CLOUD 9 SANCTUARY', width / 2, 95);

  // Main Certificate Title
  ctx.font = 'bold 38px Georgia, "Times New Roman", serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(243, 201, 107, 0.5)';
  ctx.shadowBlur = 12;
  const mainTitle = isGraduated
    ? 'FULL OBSERVATORY GRADUATION'
    : 'APPRENTICE-IN-TRAINING CERTIFICATE';
  ctx.fillText(mainTitle, width / 2, 145);
  ctx.shadowBlur = 0; // Reset shadow

  // Gold Subtitle
  ctx.font = 'italic 18px Georgia, serif';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('Official Accreditation of the Midnight Nursery Guild', width / 2, 180);

  // 5. Dedication Copy
  ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('This celestial parchment bears witness that', width / 2, 235);

  // 6. Recipient Nickname (Sanitized display)
  const safeNickname = nickname.trim().slice(0, 28) || 'Stargazer';
  ctx.font = 'bold 44px Georgia, "Times New Roman", serif';
  ctx.fillStyle = '#f3c96b';
  ctx.shadowColor = 'rgba(243, 201, 107, 0.6)';
  ctx.shadowBlur = 10;
  ctx.fillText(safeNickname, width / 2, 290);
  ctx.shadowBlur = 0;

  // Decorative Underline under Nickname
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 160, 310);
  ctx.lineTo(width / 2 + 160, 310);
  ctx.stroke();

  // Ceremony Text
  ctx.font = '17px Georgia, serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(
    'has explored the cloudways, aided the nocturnal dreamers, and gathered the starlight of Cloud 9.',
    width / 2,
    345
  );

  // 7. Stats & Accomplishments Badges Box
  const boxY = 385;
  const boxW = 820;
  const boxH = 135;
  const boxX = (width - boxW) / 2;

  ctx.fillStyle = 'rgba(30, 35, 61, 0.75)';
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  // 3 Stats Columns inside box
  const col1X = boxX + boxW * 0.2;
  const col2X = boxX + boxW * 0.5;
  const col3X = boxX + boxW * 0.8;

  // Column 1: Star Record
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('STAR HARVEST RECORD', col1X, boxY + 36);
  ctx.font = 'bold 24px Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(highScore > 0 ? `${highScore} Stars ⭐` : 'Apprentice Scout', col1X, boxY + 70);
  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Verified Slumber Catch', col1X, boxY + 95);

  // Column 2: Milestones
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('QUEST DISCOVERIES', col2X, boxY + 36);
  ctx.font = 'bold 24px Georgia, serif';
  ctx.fillStyle = isGraduated ? '#f3c96b' : '#ffffff';
  ctx.fillText(`${completedMilestonesCount} of 3 Milestones`, col2X, boxY + 70);
  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(isGraduated ? '🌟 Full Graduation' : 'In Active Progress', col2X, boxY + 95);

  // Column 3: Bedside Aura
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#f4d6d7';
  ctx.fillText('FAVORITE BEDSIDE AURA', col3X, boxY + 36);
  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(favoriteAura.replace(/\(.*\)/, '').trim(), col3X, boxY + 70);
  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Calibrated Luminescence', col3X, boxY + 95);

  // Dividers between stat columns
  ctx.strokeStyle = 'rgba(243, 201, 107, 0.2)';
  ctx.beginPath();
  ctx.moveTo(boxX + boxW * 0.35, boxY + 25);
  ctx.lineTo(boxX + boxW * 0.35, boxY + boxH - 25);
  ctx.moveTo(boxX + boxW * 0.65, boxY + 25);
  ctx.lineTo(boxX + boxW * 0.65, boxY + boxH - 25);
  ctx.stroke();

  // 8. Unlocked Sky Companions Ribbon
  const companionY = 560;
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('UNLOCKED SKY COMPANIONS', width / 2, companionY);

  const companionBadges = [
    { id: 'cloud-kitten', label: '🐱 Cloud Kitten', unlocked: unlockedCompanions.includes('cloud-kitten') },
    { id: 'golden-badger', label: '🦡 Barnaby Badger', unlocked: unlockedCompanions.includes('golden-badger') },
    { id: 'celestial-moth', label: '🦋 Celestial Moth', unlocked: unlockedCompanions.includes('celestial-moth') },
  ];

  ctx.font = '15px Georgia, serif';
  const companionSpacing = 240;
  companionBadges.forEach((comp, idx) => {
    const cx = width / 2 + (idx - 1) * companionSpacing;
    if (comp.unlocked) {
      ctx.fillStyle = '#fdfbf7';
      ctx.fillText(comp.label, cx, companionY + 28);
      ctx.fillStyle = 'rgba(243, 201, 107, 0.6)';
      ctx.font = '11px sans-serif';
      ctx.fillText('✦ Guardian Attuned', cx, companionY + 46);
      ctx.font = '15px Georgia, serif';
    } else {
      ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
      ctx.fillText(`🔒 ${comp.label.replace(/^.*? /, '')}`, cx, companionY + 28);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.font = '11px sans-serif';
      ctx.fillText('Awaiting Discovery', cx, companionY + 46);
      ctx.font = '15px Georgia, serif';
    }
  });

  // 9. Official Lore Tagline
  ctx.font = 'italic 16px Georgia, serif';
  ctx.fillStyle = '#fbcfe8';
  ctx.fillText('“I build the dreams you fall asleep inside.”', width / 2, 650);

  // 10. Footer Ceremonial Row: Date | Wax Seal | Pip Signature
  const footerY = 725;

  // Left: Date & Accreditation Number
  ctx.textAlign = 'left';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('ACCREDITED NIGHT', 110, footerY - 20);
  ctx.font = '16px Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Night of October 19, 2026', 110, footerY + 5);
  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Registry Code: #OBS-2026-CLOUD9', 110, footerY + 25);

  // Center: Golden Wax Seal
  const sealX = width / 2;
  const sealY = footerY;
  const sealR = 48;

  // Outer Seal Glow
  const sealGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, sealR);
  sealGrad.addColorStop(0, '#fef08a');
  sealGrad.addColorStop(0.7, '#d97706');
  sealGrad.addColorStop(1, '#92400e');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 6, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('★ MIDNIGHT NURSERY ★', sealX, sealY - 14);
  ctx.font = 'bold 15px Georgia, serif';
  ctx.fillText(isGraduated ? 'GRADUATED' : 'APPRENTICE', sealX, sealY + 2);
  ctx.font = 'bold 8px sans-serif';
  ctx.fillText('CLOUD 9 SEAL', sealX, sealY + 16);

  // Right: Pip's Signature
  ctx.textAlign = 'right';
  ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#f3c96b';
  ctx.fillText('ACCREDITING ENGINEER', width - 110, footerY - 20);

  // Stylized Signature
  ctx.font = 'italic bold 28px "Brush Script MT", "Caveat", "Dancing Script", cursive, Georgia';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(243, 201, 107, 0.5)';
  ctx.shadowBlur = 6;
  ctx.fillText('Pip ✦ Junior Dream Engineer', width - 110, footerY + 8);
  ctx.shadowBlur = 0;

  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Midnight Nursery Custodian Post', width - 110, footerY + 28);
}

/**
 * Trigger browser PNG download of the rendered canvas
 */
export function downloadCertificatePng(canvas, rawNickname = 'Stargazer') {
  if (!canvas) throw new Error('Certificate canvas unavailable');

  const sanitized = rawNickname
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30)
    .trim() || 'Stargazer';

  const filename = `pip-dream-engineer-certificate-${sanitized}.png`;

  try {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Certificate download error:', err);
    throw err;
  }
}
