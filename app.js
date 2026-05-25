let currentTool = 'nxc';
const TOOL_LABELS = {
    nxc: 'NXC',
    bloodyad: 'BloodyAD',
    windowsad: 'Windows AD',
    impacket: 'Impacket',
    certipy: 'Certipy / ADCS',
    bloodhound: 'BloodHound',
    methodology: 'Methodology',
    privexchange: 'PrivExchange'
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const toolParam = urlParams.get('tool');
    if (toolParam && CHEATSHEET_DATA[toolParam.toLowerCase()]) {
        currentTool = toolParam.toLowerCase();
    }

    renderToolTabs();
    renderToolContent(currentTool);
    setupEventListeners();
    createParticles();
    typeText();
});

function renderToolTabs() {
    const container = document.getElementById('tool-selector');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(CHEATSHEET_DATA).forEach(toolId => {
        const tab = document.createElement('div');
        tab.className = `tool-tab ${toolId === currentTool ? 'active' : ''}`;
        tab.textContent = TOOL_LABELS[toolId] || toolId.toUpperCase();
        tab.dataset.tool = toolId;
        tab.onclick = () => switchTool(toolId);
        container.appendChild(tab);
    });
}

function switchTool(toolId) {
    currentTool = toolId;
    document.querySelectorAll('.tool-tab').forEach(t => t.classList.toggle('active', t.dataset.tool === toolId));
    renderToolContent(toolId);
}

function renderToolContent(toolId) {
    const tabsContainer = document.getElementById('tabs');
    const panelsContainer = document.getElementById('panels');
    if (!tabsContainer || !panelsContainer) return;

    tabsContainer.innerHTML = '';
    panelsContainer.innerHTML = '';

    const toolData = CHEATSHEET_DATA[toolId];
    if (!toolData) return;
    const workspaceTitle = document.getElementById('workspace-title');
    if (workspaceTitle) workspaceTitle.textContent = TOOL_LABELS[toolId] || toolId.toUpperCase();

    toolData.forEach((cat, index) => {
        // Create Tab
        const tab = document.createElement('div');
        tab.className = `tab ${index === 0 ? 'active' : ''}`;
        tab.dataset.tab = cat.id;
        tab.innerHTML = `<i class="ti ${cat.icon}"></i> ${cat.title}`;
        tab.onclick = () => switchProtocolTab(cat.id);
        tabsContainer.appendChild(tab);

        // Create Panel
        const panel = document.createElement('div');
        panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
        panel.id = `panel-${cat.id}`;

        cat.sections.forEach(sec => {
            const section = document.createElement('div');
            section.className = 'section';
            section.innerHTML = `<div class="section-title">${sec.title}</div>`;

            sec.items.forEach(item => {
                const cmdBlock = document.createElement('div');
                cmdBlock.className = 'cmd-block';
                const escapedCode = item.code.replace(/"/g, '&quot;');

                cmdBlock.innerHTML = `
                    <div class="cmd-header">
                        <div class="cmd-label">${item.label}</div>
                        <span class="tag ${item.tagClass}">${item.tag}</span>
                    </div>
                    <div class="cmd-body">
                        <button class="copy-btn" onclick="copyToClipboard(this)" title="Copy command" aria-label="Copy command">
                            <i class="ti ti-copy"></i>
                            <span>Copy</span>
                        </button>
                        <div class="cmd-code" data-template="${escapedCode}">${item.code}</div>
                        ${item.note ? `<div class="cmd-note">${item.note}</div>` : ''}
                    </div>
                `;
                section.appendChild(cmdBlock);
            });
            panel.appendChild(section);
        });
        panelsContainer.appendChild(panel);
    });

    updateCommands();
    filterCommands();
}

function switchProtocolTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `panel-${id}`));
}

function setupEventListeners() {
    const inputs = ['target', 'dc', 'user', 'pass', 'hash', 'domain'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateCommands);
    });
    const search = document.getElementById('command-search');
    if (search) search.addEventListener('input', filterCommands);
}

function filterCommands() {
    const search = document.getElementById('command-search');
    const query = search ? search.value.trim().toLowerCase() : '';
    document.querySelectorAll('.cmd-block').forEach(block => {
        const haystack = block.textContent.toLowerCase();
        block.hidden = query.length > 0 && !haystack.includes(query);
    });
    document.querySelectorAll('.section').forEach(section => {
        const visibleCommands = section.querySelectorAll('.cmd-block:not([hidden])').length;
        section.hidden = query.length > 0 && visibleCommands === 0;
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
        const visibleSections = panel.querySelectorAll('.section:not([hidden])').length;
        const tab = document.querySelector(`.tab[data-tab="${panel.id.replace('panel-', '')}"]`);
        if (tab) tab.classList.toggle('has-search-match', query.length > 0 && visibleSections > 0);
    });
}

function getFormattedHash(hash) {
    if (!hash) return ':8846f7eaee8fb117ad06bdd830b7586c';
    return hash.includes(':') ? hash : `:${hash}`;
}

function getNthash(hash) {
    if (!hash) return '8846f7eaee8fb117ad06bdd830b7586c';
    const parts = hash.split(':');
    return parts[parts.length - 1] || hash;
}

function getBloodyAdAuthPrefix({ dcip, domain, user, pass, hash, hasHash }) {
    const credential = hasHash ? getFormattedHash(hash) : (pass || 'P@ssw0rd');
    return `bloodyAD --host ${dcip} -d ${domain} -u ${user} -p ${credential}`;
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceAllLiteral(code, from, to) {
    return code.replace(new RegExp(escapeRegex(from), 'g'), to);
}

function updateCommands() {
    const targetEl = document.getElementById('target');
    const dcEl = document.getElementById('dc');
    const userEl = document.getElementById('user');
    const passEl = document.getElementById('pass');
    const hashEl = document.getElementById('hash');
    const domainEl = document.getElementById('domain');

    if (!targetEl || !userEl) return;

    const targetInput = targetEl.value.trim();
    const target = targetInput || '192.168.1.0/24';
    const dcip = dcEl ? (dcEl.value.trim() || target.replace(/\/.*/, '')) : target.replace(/\/.*/, '');
    const user = userEl.value.trim() || 'administrator';
    const pass = passEl ? passEl.value.trim() : '';
    const hash = hashEl ? hashEl.value.trim() : '';
    const domain = domainEl ? (domainEl.value.trim() || 'lab.local') : 'lab.local';

    // Derive domain parts for BloodyAD MAQ command
    const domainParts = domain.split('.');
    const domainFirst = domainParts[0] || 'lab';
    const domainTld = domainParts[1] || 'local';
    const dcFqdn = `dc.${domain}`;
    const domainDn = domainParts.map(part => `DC=${part}`).join(',');

    const hasPass = pass.length > 0;
    const hasHash = hash.length > 0;
    const defaultPass = pass || 'P@ssw0rd';
    const newPass = pass || 'NewP@ss123!';
    const recoveredPass = pass || 'RecoveredPassword!';
    const fmtHash = getFormattedHash(hash);
    const ntHash = getNthash(hash);
    const bloodyCredential = hasHash && !hasPass ? fmtHash : defaultPass;
    const targetLooksLikeHost = targetInput && !targetInput.includes('/') && !/^\d{1,3}(\.\d{1,3}){3}$/.test(targetInput);
    const objectTarget = targetLooksLikeHost ? targetInput : user;
    const targetHost = targetLooksLikeHost ? targetInput.replace(/\$$/, '') : 'DC01';
    const targetFqdn = `${targetHost}.${domain}`;
    const dcHost = dcip.includes('.') && !/^\d{1,3}(\.\d{1,3}){3}$/.test(dcip) ? dcip.split('.')[0] : 'DC01';
    const domainSid = 'S-1-5-21-1111111111-2222222222-3333333333';
    const aes256 = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
    const attackerIp = '10.10.14.1';
    const allowedSpn = `cifs/${dcFqdn}`;
    const machineHash = 'aad3b435b51404eeaad3b435b51404ee:11223344556677889900aabbccddeeff';
    const computerAccount = targetHost.replace(/\$$/, '').toLowerCase();
    const computerPass = pass || computerAccount;
    const caName = `${dcHost}\\${domainFirst.toUpperCase()}-CA`;
    const certTemplate = 'User';
    const pfxFile = `${user}.pfx`;
    const bloodyAuthPrefix = getBloodyAdAuthPrefix({ dcip, domain, user, pass, hash, hasHash });
    const bloodyKerbPrefix = `bloodyAD --host ${dcip} -d ${domain} -u ${user} -k`;

    const codeBlocks = document.querySelectorAll('.cmd-code');

    codeBlocks.forEach(block => {
        let code = block.dataset.template;

        // ── NXC-style replacements ────────────────────────────────────────
        code = code.replace(/192\.168\.1\.50/g, dcip);
        code = code.replace(/192\.168\.1\.0\/24/g, target);
        code = code.replace(/10\.10\.10\.10/g, dcip);
        code = code.replace(/10\.129\.95\.210/g, dcip);
        code = code.replace(/10\.129\.115\.197/g, dcip);
        code = code.replace(/172\.16\.1\.10/g, dcip);
        code = code.replace(/\[IP_ADDRESS\]/g, dcip);
        code = code.replace(/dc\.lab\.local/g, dcFqdn);
        code = code.replace(/dc01\.corp\.local/g, dcFqdn);
        code = code.replace(/dc01\.domain\.local/g, dcFqdn);
        code = code.replace(/dc01\.signed\.htb/g, dcFqdn);
        code = code.replace(/DC01\.inlanefreight\.htb/g, dcFqdn);
        code = code.replace(/\bdc01\b/g, dcHost.toLowerCase());
        code = code.replace(/\bDC01\b/g, dcHost);
        code = code.replace(/lab\.local/g, domain.toLowerCase());
        code = code.replace(/LAB\.LOCAL/g, domain.toUpperCase());
        code = code.replace(/corp\.local/g, domain.toLowerCase());
        code = code.replace(/domain\.local/g, domain.toLowerCase());
        code = code.replace(/domain\.htb/g, domain.toLowerCase());
        code = code.replace(/htb\.local/g, domain.toLowerCase());
        code = code.replace(/inlanefreight\.htb/g, domain.toLowerCase());
        code = code.replace(/signed\.htb/g, domain.toLowerCase());
        code = code.replace(/\bcorp\//g, `${domain}/`);
        code = code.replace(/\bcorp\\/g, `${domain}\\`);
        code = code.replace(/\badmin\b/g, user);
        code = code.replace(/\badministrator\b/g, user);
        code = code.replace(/\bAdministrator\b/g, user);
        code = code.replace(/\balice\b/g, user);
        code = code.replace(/\bjulio\b/g, user);
        code = code.replace(/\bplaintext\b/g, user);
        code = code.replace(/\badam\.scott\b/g, user);
        code = code.replace(/\bhenry\b/g, user);
        code = code.replace(/\bsvc_sql\b/g, objectTarget);
        code = code.replace(/\bsvc-alfresco\b/g, objectTarget);

        // NXC pass/hash replacement
        if (hasPass && !hasHash) {
            code = code.replace(/-p\s+'[^']*'/g, `-p '${pass}'`);
            code = code.replace(/-H\s+'[^']*'/g, `-p '${pass}'`);
        } else if (!hasPass && hasHash) {
            code = code.replace(/-p\s+'[^']*'/g, `-H '${fmtHash}'`);
            code = code.replace(/-H\s+'[^']*'/g, `-H '${fmtHash}'`);
        } else if (hasPass && hasHash) {
            code = code.replace(/-p\s+'[^']*'/g, `-p '${pass}' -H '${hash}'`);
            code = code.replace(/-H\s+'[^']*'/g, `-p '${pass}' -H '${hash}'`);
        }

        const passPlaceholders = ["'P@ss'", "'P@ssw0rd'", "'Password123'", "'Password123!'"];
        passPlaceholders.forEach(p => {
            if (hasPass) code = code.replace(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `'${pass}'`);
        });
        code = replaceAllLiteral(code, 'NewP@ss123!', newPass);
        code = replaceAllLiteral(code, 'RecoveredPassword!', recoveredPass);
        code = replaceAllLiteral(code, 'EvilP@ss1', defaultPass);
        code = replaceAllLiteral(code, 'EvilPass123!', defaultPass);
        code = replaceAllLiteral(code, 'EvilP@ss123!', defaultPass);
        code = replaceAllLiteral(code, 'P@ss123!', defaultPass);
        code = replaceAllLiteral(code, 'Password123', defaultPass);
        code = replaceAllLiteral(code, 'H3nry_987TGV!', defaultPass);

        if (hasHash) {
            code = code.replace(/'([a-f0-9]{32}:[a-f0-9]{32})'/g, `'${hash}'`);
            code = code.replace(/'(:[a-f0-9]{32})'/g, `'${hash.startsWith(':') ? hash : ':' + hash}'`);
            code = code.replace(/'HASH'/g, `'${hash}'`);
        }

        // ── BloodyAD-style replacements ───────────────────────────────────
        // Expand compact BloodyAD examples into full commands using the shared credential bar.
        code = code.replace(/bloodyAD\s+\.\.\.\s+-k\b/g, bloodyKerbPrefix);
        code = code.replace(/bloodyAD\s+\.\.\./g, bloodyAuthPrefix);

        // Shell variable style: $DC, $DOMAIN, $USER, $PASS
        code = code.replace(/\$DC\b/g, dcip);
        code = code.replace(/\$DOMAIN_FIRST\b/g, domainFirst);
        code = code.replace(/\$DOMAIN_TLD\b/g, domainTld);
        code = code.replace(/\$DOMAIN\b/g, domain);
        code = code.replace(/\$USER\b/g, user);
        code = code.replace(/\$PASS\b/g, bloodyCredential);
        code = code.replace(/\$HASH\b/g, fmtHash);
        code = code.replace(/\$TARGET_USER\b/g, objectTarget);
        code = code.replace(/\$TARGET\b/g, objectTarget);
        code = code.replace(/\$GROUP\b/g, 'Domain Admins');

        // Angle-bracket placeholder style: <DC_IP>, <DOMAIN>, <user>, <password>, <NThash>, etc.
        code = code.replace(/<DC_IP>/g, dcip);
        code = code.replace(/<DOMAIN>/g, domain);
        code = code.replace(/<DOMAIN_UPPER>/g, domain.toUpperCase());
        code = code.replace(/<DOMAIN_FIRST>/g, domainFirst);
        code = code.replace(/<DOMAIN_TLD>/g, domainTld);
        code = code.replace(/<DOMAIN_DN>/g, domainDn);
        code = code.replace(/<domain>/g, domainFirst);
        code = code.replace(/<tld>/g, domainTld);
        code = code.replace(/<password>/g, bloodyCredential);
        code = code.replace(/<pass>/g, bloodyCredential);
        code = code.replace(/<PASS>/g, bloodyCredential);
        code = code.replace(/<NThash>/g, ntHash);
        code = code.replace(/<nt_hash>/g, ntHash);
        code = code.replace(/<NTLM_HASH>/g, ntHash);
        code = code.replace(/<FQDN>/g, targetFqdn);
        code = code.replace(/<DC_FQDN>/g, dcFqdn);
        code = code.replace(/<DC_HOST>/g, dcHost);
        code = code.replace(/<TARGET_HOST>/g, `${targetHost}$`);
        code = code.replace(/<COMPUTER>/g, `${targetHost}$`);
        code = code.replace(/<TARGET_USER>/g, objectTarget);
        code = code.replace(/<target_user>/g, objectTarget);
        code = code.replace(/<targetuser>/g, objectTarget);
        code = code.replace(/<controlled_user>/g, user);
        code = code.replace(/<user_to_add>/g, user);
        code = code.replace(/<user_to_remove>/g, user);
        code = code.replace(/<TARGET_OBJECT>/g, objectTarget);
        code = code.replace(/<OBJECT_DN>/g, objectTarget);
        code = code.replace(/<GROUP_NAME>/g, 'Domain Admins');
        code = code.replace(/<gMSA_account>/g, 'gmsa');
        code = code.replace(/<attribute>/g, 'memberOf');
        code = code.replace(/<DOMAIN_SID>/g, domainSid);
        code = code.replace(/<SID>/g, domainSid);
        code = code.replace(/<KRBTGT_NThash>/g, ntHash);
        code = code.replace(/<KRBTGT_HASH>/g, ntHash);
        code = code.replace(/<KRBTGT_AES256>/g, aes256);
        code = code.replace(/<AES256>/g, aes256);
        code = code.replace(/<SPN>/g, `cifs/${dcFqdn}`);
        code = code.replace(/<ALLOWED_SPN>/g, allowedSpn);
        code = code.replace(/<IP_ADDRESS>/g, dcip);
        code = code.replace(/<TARGET_IP>/g, dcip);
        code = code.replace(/<ATTACKER_IP>/g, attackerIp);
        code = code.replace(/<IP>/g, attackerIp);
        code = code.replace(/<COMMAND>/g, `get object ${objectTarget}`);
        code = code.replace(/<RFC822>/g, '');
        code = code.replace(/<MACHINE_HASH>/g, machineHash);
        code = code.replace(/<MACHINE_ACCOUNT_HASH>/g, machineHash);
        code = code.replace(/<COMPUTER_ACCOUNT>/g, computerAccount);
        code = code.replace(/<COMPUTER_PASS>/g, computerPass);
        code = code.replace(/<CA_NAME>/g, caName);
        code = code.replace(/<CA>/g, caName);
        code = code.replace(/<TEMPLATE>/g, certTemplate);
        code = code.replace(/<PFX>/g, pfxFile);
        code = code.replace(/<CERT_PFX>/g, pfxFile);
        code = code.replace(/<CERT_ID>/g, '1');
        code = code.replace(/<UPN>/g, `${user}@${domain}`);
        code = code.replace(/<TARGET_FQDN>/g, targetFqdn);
        code = code.replace(/<target_fqdn>/g, targetFqdn);
        code = code.replace(/<DELEGATE_TO_FQDN>/g, targetFqdn);
        code = code.replace(/<DC_HOSTNAME>/g, dcHost);
        code = code.replace(/<target>/g, objectTarget);
        code = code.replace(/<target_object>/g, objectTarget);
        code = code.replace(/<targetFQDN>/g, targetFqdn);
        code = code.replace(/<spn_type>/g, 'cifs');
        code = code.replace(/<username>/g, user);
        code = code.replace(/<username_to_impersonate>/g, 'Administrator');
        code = code.replace(/<domain_fqdn>/g, domain);
        code = code.replace(/<domain_controller_fqdn_or_ip>/g, dcip);
        code = code.replace(/<aes256_key>/g, aes256);
        code = code.replace(/<aes_key>/g, aes256);
        code = code.replace(/<passfile>/g, 'passwords.txt');
        code = code.replace(/<svc_user>/g, user);
        code = code.replace(/<DELEGATE_FROM>/g, 'evil$');
        code = code.replace(/<DELEGATE_TO>/g, targetHost);
        code = code.replace(/<FILE>/g, 'shadow');
        code = code.replace(/<KEY_ID>/g, 'KEY_ID');
        code = code.replace(/<d>/g, domainFirst);
        code = code.replace(/<t>/g, domainTld);
        // bloodyAD -p <password> pattern
        code = code.replace(/(-p )EvilP@ss123!/g, `$1${defaultPass}`);
        code = code.replace(/(-p )P@ss123!/g, `$1${defaultPass}`);
        code = code.replace(/(-p )P@ssw0rd/g, `$1${defaultPass}`);
        code = code.replace(/(:'|')EvilP@ss123!(')/g, `$1${defaultPass}$2`);
        code = code.replace(/(:'|')P@ss123!(')/g, `$1${defaultPass}$2`);
        // Replace -p :<NThash> style after generic placeholder replacement.
        code = code.replace(/-p\s+:(?!:)([a-fA-F0-9]{32})/g, `-p ${fmtHash}`);
        code = code.replace(/<user>/g, user);
        // BloodyAD -u <user> pattern
        code = code.replace(/(-u )administrator/g, `$1${user}`);

        block.textContent = code;
    });
    filterCommands();
}

function copyToClipboard(btn) {
    const code = btn.nextElementSibling.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="ti ti-check"></i><span>Copied</span>';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 1500);
    });
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typing effect remains in index.html as per Step 183
function typeText() {
    // Only if on tool page and has typed-text element
    const element = document.getElementById('typed-text');
    if (!element) return;
    // ... logic would go here if we wanted it on soul.html too
}
