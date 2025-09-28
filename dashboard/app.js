async function init() {
  const pageType = document.body.dataset.page;
  if (pageType === 'index') {
    await buildIndex();
  } else if (pageType === 'deliverable') {
    wireCopyButton();
  }
}

async function buildIndex() {
  const listEl = document.querySelector('#deliverable-list');
  if (!listEl) return;
  try {
    const response = await fetch('../deliverables/deliverables.json');
    const deliverables = await response.json();
    const descriptions = {
      '01': 'Define who we serve, what they need, and how Trial Reel Machine wins.',
      '02': 'Hero messaging, features, and CTAs ready for the public site.',
      '03': 'Persona-by-persona value propositions with proof points.',
      '04': 'Feature-to-benefit translation for quick sales enablement.',
      '05': 'Pricing overview with inclusions and positioning tips.',
      '06': 'One-page overview for partners and press conversations.',
      '07': 'Three-touch email sequence to nurture new sign-ups.',
      '08': 'DM-friendly outreach script for creators and partners.',
      '09': 'Ready-to-post LinkedIn copy for founder and team profiles.',
      '10': 'Short X thread announcing the launch and key benefits.',
      '11': 'Narrative blog post introducing the product and workflow.',
      '12': 'Press release formatted for media outreach.',
      '13': 'Product Hunt listing copy with maker comment and features.',
      '14': 'Story-driven Reddit post following launch best practices.',
      '15': 'FAQ answers for support docs and community channels.',
      '16': '60-second video script for promo or ads.',
      '17': 'Plan to engage creator communities and gather feedback.',
      '18': 'JSON ad variants for paid channels.'
    };

    deliverables.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'card';
      const title = document.createElement('h3');
      title.textContent = `${item.id}. ${item.title}`;
      const description = document.createElement('p');
      description.textContent = descriptions[item.id] || '';
      const link = document.createElement('a');
      const filename = `${item.id}_${item.slug}.html`;
      link.href = `pages/${filename}`;
      link.textContent = 'Open Deliverable';
      card.append(title, description, link);
      listEl.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to build index', error);
    listEl.innerHTML = '<p>Unable to load deliverables. Please ensure deliverables.json is available.</p>';
  }
}

function wireCopyButton() {
  const button = document.querySelector('.copy-btn');
  const status = document.querySelector('.copy-status');
  const content = document.querySelector('.deliverable-content');
  if (!button || !content) return;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(content.textContent.trim());
      if (status) {
        status.textContent = 'Copied to clipboard!';
        setTimeout(() => (status.textContent = ''), 2500);
      }
    } catch (err) {
      console.error('Copy failed', err);
      if (status) {
        status.textContent = 'Copy failed. Select and copy manually.';
        status.style.color = '#fca5a5';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
