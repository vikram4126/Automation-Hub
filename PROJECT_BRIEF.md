# Project Brief: Enterprise Automation Hub

**Core Purpose:**
The Enterprise Automation Hub is a centralized, gamified portal designed to crowdsource manual, time-consuming processes from employees across the company. It allows the development team to pick up these ideas, automate them, and directly track the exact ROI (hours and money saved) for the business.

### 🌟 Key Highlight Features

1. **Real-Time ROI Calculation:** 
   The system automatically calculates the annual "Hours Saved" the moment a user submits a manual process and the developer automates it. This instantly proves the financial value of the automation team to the leadership.

2. **Smart AI Copilot Engine:**
   An intelligent backend rule-engine that scans incoming user requests in real-time. It detects duplicate projects (to prevent wasted developer effort) and suggests the best technology stack (e.g., Power Apps vs. Power Automate) and estimated timeline.

3. **Dual-Sided Gamification (Points & Badges):**
   To drive adoption, the platform rewards everyone. 
   * **Idea Submitters** earn points for reporting manual processes and a bonus when their idea is automated.
   * **Developers** earn points based on the complexity and frequency of the task they automate. 
   Points unlock badges (from *Innovator* to *Automation Hero*) displayed on a company-wide Leaderboard.

4. **Transparent Project Pipeline & Co-Ownership:**
   A visual Kanban-style board where employees can track the exact status of their requests (Open, Picked, Development, Testing, Completed). It supports **Co-Ownership**, meaning multiple developers (e.g., a Designer and a Coder) can be assigned to the same project, and both will equally earn points and badges for their collaboration.

5. **Automated Workflows & Notifications:**
   Built-in Power Automate flows ensure seamless communication. The system automatically sends Teams/Email notifications to the user when a developer picks up their task and when the automation is successfully deployed.

6. **Leadership Analytics (Native Dashboards):**
   A dedicated executive view built directly into the app using Power Apps native charts. It gives management a bird's-eye view of active projects, departmental usage, and company-wide YTD (Year-to-Date) hours saved. It also includes an automated **Export to Excel** feature that emails a deep-dive CSV report to leadership.

### 🛠️ Architecture / Tech Stack
* **Database:** SharePoint Lists (Highly scalable and integrated)
* **Frontend & Workflows:** Power Apps (User Interface, Forms, Leaderboard)
* **Automation:** Power Automate (Points calculation, Email/Teams notifications, Excel Exports)
* **Reporting:** Power Apps (Native dynamic charts based on SharePoint data filters)
