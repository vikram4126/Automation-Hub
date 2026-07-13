# Automation Hub — Complete Power Apps Build Guide
### Prototype → Production Implementation

> This document maps every feature of the React prototype to its exact Power Apps/SharePoint equivalent, with column names, Power Fx formulas, and Power Automate flow steps.

---

## TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [SharePoint Lists Setup](#2-sharepoint-lists-setup)
3. [Power Apps — App Setup](#3-power-apps--app-setup)
4. [Screen-by-Screen Build Guide](#4-screen-by-screen-build-guide)
   - [Layout: Sidebar + Header](#screen-layout-sidebar--header)
   - [Dashboard](#screen-dashboard)
   - [Submit Request](#screen-submit-request)
   - [Browse Requests (Kanban)](#screen-browse-requests-kanban)
   - [My Requests](#screen-my-requests)
   - [My Picked Tasks](#screen-my-picked-tasks)
   - [Innovation Board](#screen-innovation-board)
   - [Leaderboard](#screen-leaderboard)
   - [Reports](#screen-reports)
   - [Knowledge Base](#screen-knowledge-base)
   - [Admin Panel](#screen-admin-panel)
5. [Power Automate Flows](#5-power-automate-flows)
6. [Role-Based Access (RBAC)](#6-role-based-access-rbac)
7. [Admin: Managing Copilot Rules](#7-admin-managing-copilot-rules)
8. [Complete Formula Reference](#8-complete-formula-reference)

---

## 1. PROJECT OVERVIEW

### What we are building
An enterprise internal portal where employees can:
- Submit automation/app requests
- Browse and pick tasks to develop
- Track progress of their submitted requests
- Share ideas and vote on them
- See a live Leaderboard of developers

### Technology Stack
| Layer | Tool |
|---|---|
| Frontend (UI) | Power Apps Canvas App |
| Database | SharePoint Lists |
| Backend/Logic | Power Automate Cloud Flows |
| Analytics | Power BI (embedded) |
| Identity/Auth | Microsoft Entra ID (Azure AD) |
| Notifications | Microsoft Teams + Email |

---

## 2. SHAREPOINT LISTS SETUP

> Create all lists in SharePoint **before** opening Power Apps. Go to your SharePoint Site → **New → List** for each one.

---

### LIST 1: `Automation_Requests`
**Purpose:** Central database for all requests and enhancement tickets.

| Column Name | SharePoint Type | Required | Options / Notes |
|---|---|---|---|
| **Title** | Single line text | ✅ | Auto-created. Use as Request ID label |
| **RequestTitle** | Single line text | ✅ | The actual title user types |
| **Description** | Multiple lines of text | ✅ | User's problem description |
| **CurrentSteps** | Multiple lines of text | ❌ | The current manual steps |
| **RequestType** | Choice | ✅ | New Request, Enhancement Request |
| **ParentRequestID** | Number | ❌ | Filled if RequestType = Enhancement |
| **ParentProjectName** | Single line text | ❌ | Name of existing app being enhanced |
| **Status** | Choice | ✅ | Open, Picked, Development, Testing, Completed, Duplicate |
| **Priority** | Choice | ✅ | Low, Medium, High, Critical |
| **Category** | Choice | ✅ | Power Apps, Power Automate, Power BI, React, Vue.js, Cloud Code, Other |
| **SubmittedBy** | Person or Group | ✅ | Auto-fill from current user |
| **AssignedTo** | Person or Group | ❌ | Set by Flow or developer |
| **Frequency** | Choice | ✅ | Daily, Weekly, Monthly, Ad-hoc |
| **TimeSpent** | Choice | ✅ | 30 Minutes, 1 Hour, 2 Hours, More |
| **IdealSolution** | Single line text | ❌ | e.g. "Automated Dashboard" |
| **ExpectedBenefits** | Multiple lines of text | ❌ | Save Time, Reduce Errors, etc. |
| **WhyNotEnough** | Multiple lines of text | ❌ | Reason when duplicate exists |
| **AITech** | Single line text | ❌ | Copilot recommended technology |
| **AIComplexity** | Choice | ❌ | Low, Medium, High, Very High |
| **AITimeline** | Single line text | ❌ | e.g. "2-3 Weeks" |
| **AIDuplicate** | Single line text | ❌ | Name of existing similar project |
| **AIDuplicateDev** | Person or Group | ❌ | Developer of existing project |
| **Progress** | Number | ❌ | 0 to 100 |
| **Deadline** | Date and Time | ❌ | Target delivery date |
| **ProgressNotes** | Multiple lines of text | ❌ | Developer's update notes |
| **SubmittedOn** | Date and Time | ✅ | Auto = Created column in SharePoint |
| **Attachments** | Yes (enable in List Settings) | ❌ | File attachments from users |

---

### LIST 2: `User_Stats`
**Purpose:** Leaderboard data — one row per developer.

| Column Name | SharePoint Type | Required | Notes |
|---|---|---|---|
| **Title** | Single line text | ✅ | Auto-created, use as Employee Name |
| **Employee** | Person or Group | ✅ | The developer's account |
| **TotalPoints** | Number | ✅ | Default: 0 |
| **AppsBuilt** | Number | ✅ | Default: 0 |
| **FlowsBuilt** | Number | ✅ | Default: 0 |
| **Badge** | Choice | ✅ | Innovator, Rising Star, Flow Expert, Cloud Code Master, Automation Hero |
| **LastUpdated** | Date and Time | ❌ | Auto-set by Flow |

---

### LIST 3: `Copilot_Rules`
**Purpose:** The AI/Rules Engine. Admins manage this list. No code changes needed when adding new rules.

| Column Name | SharePoint Type | Required | Notes |
|---|---|---|---|
| **Title** | Single line text | ✅ | Auto-created, use as rule name |
| **Keyword** | Single line text | ✅ | e.g. "banner", "leave", "excel" |
| **ProjectName** | Single line text | ✅ | e.g. "Banner Creator with React" |
| **OriginalDeveloper** | Person or Group | ❌ | e.g. Shantanu (for duplicate detection) |
| **OriginalRequestRef** | Single line text | ❌ | e.g. "REQ-023" |
| **SuggestedTech** | Single line text | ✅ | e.g. "Power Automate (Cloud Flow)" |
| **Complexity** | Choice | ✅ | Low, Medium, High, Very High |
| **Timeline** | Single line text | ✅ | e.g. "2-3 Weeks" |
| **Message** | Multiple lines of text | ✅ | Explanation shown in Copilot panel |
| **IsDuplicate** | Yes/No | ✅ | Yes if this rule flags an existing app |

**Starter Rows to add in this list:**

| Keyword | ProjectName | SuggestedTech | Complexity | Timeline | IsDuplicate |
|---|---|---|---|---|---|
| banner | Banner Creator with React | Custom React Web App | Medium | 3 Weeks | Yes |
| microsite | Microsite Builder with React | Custom React Web App | Very High | 6+ Weeks | Yes |
| leave | HR Leave & Onboarding System | Power Apps + Automate | High | 4 Weeks | Yes |
| onboarding | HR Leave & Onboarding System | Power Apps + Automate | High | 4 Weeks | Yes |
| excel | — | Power Automate (Cloud Flow) | Low | 1 Week | No |
| email | — | Power Automate (Cloud Flow) | Low | 1 Week | No |
| pdf | — | Power Automate + AI Builder | Medium | 2 Weeks | No |
| form | — | Power Apps (Canvas App) | High | 4 Weeks | No |
| app | — | Power Apps (Canvas App) | High | 4 Weeks | No |
| dashboard | — | Power BI Dashboard | Medium | 2 Weeks | No |
| report | — | Power BI Dashboard | Medium | 2 Weeks | No |
| react | — | Custom React Web App | Very High | 6+ Weeks | No |
| chatbot | — | Power Virtual Agents | Medium | 3 Weeks | No |

---

### LIST 4: `Innovation_Ideas`
**Purpose:** Stores user posted ideas for the Innovation Board.

| Column Name | SharePoint Type | Required | Notes |
|---|---|---|---|
| **Title** | Single line text | ✅ | Idea title |
| **Description** | Multiple lines of text | ✅ | Idea description |
| **PostedBy** | Person or Group | ✅ | Auto-filled |
| **Votes** | Number | ✅ | Default: 0 |
| **CommentsCount** | Number | ❌ | Default: 0 |
| **PostedOn** | Date and Time | ✅ | Auto = Created |

---

### LIST 5: `Knowledge_Articles`
**Purpose:** Knowledge Base articles and video links.

| Column Name | SharePoint Type | Notes |
|---|---|---|
| **Title** | Single line text | Article title |
| **Type** | Choice | Video, Article, Guide |
| **Description** | Multiple lines of text | Short description |
| **Link** | Hyperlink | URL to video/document |
| **Icon** | Choice | Video, Document, Book |

---

## 3. POWER APPS — APP SETUP

### Step 1: Create a New Canvas App
1. Go to **make.powerapps.com**
2. Click **Create → Canvas App → Tablet Layout**
3. Name: `Automation Hub`

### Step 2: Connect Data Sources
In Power Apps Studio:
1. Click the **Data** tab (cylinder icon on left)
2. Click **Add data**
3. Search for **SharePoint**
4. Enter your SharePoint site URL
5. Select all 5 lists created above
6. Click **Connect**

### Step 3: Set App Properties
```
App.OnStart:

// Set current user
Set(varCurrentUser, User());

// Check group memberships for RBAC
Set(varIsLeadership,
    !IsBlank(
        LookUp(
            Office365Groups.ListGroupMembers("YOUR_LEADERSHIP_GROUP_ID").value,
            Mail = varCurrentUser.Email
        )
    )
);
Set(varIsAdmin,
    !IsBlank(
        LookUp(
            Office365Groups.ListGroupMembers("YOUR_ADMIN_GROUP_ID").value,
            Mail = varCurrentUser.Email
        )
    )
);

// Load Copilot Rules into memory (for fast keyword matching)
ClearCollect(colCopilotRules, Copilot_Rules);

// Build navigation menu based on role
ClearCollect(colNavItems,
    {Name: "Dashboard",         Icon: Icon.Home,       Screen: ScreenDashboard,  ShowFor: "all"},
    {Name: "Submit Request",    Icon: Icon.Add,        Screen: ScreenSubmit,     ShowFor: "employee"},
    {Name: "Browse Requests",   Icon: Icon.Hamburger,  Screen: ScreenBrowse,     ShowFor: "employee"},
    {Name: "My Requests",       Icon: Icon.Document,   Screen: ScreenMyRequests, ShowFor: "employee"},
    {Name: "My Picked Tasks",   Icon: Icon.Check,      Screen: ScreenMyTasks,    ShowFor: "employee"},
    {Name: "Innovation Board",  Icon: Icon.Lightbulb,  Screen: ScreenInnovation, ShowFor: "all"},
    {Name: "Leaderboard",       Icon: Icon.Trophy,     Screen: ScreenLeaderboard,ShowFor: "all"},
    {Name: "Reports",           Icon: Icon.BarChart,   Screen: ScreenReports,    ShowFor: "leadership"},
    {Name: "Knowledge Base",    Icon: Icon.BookOpen,   Screen: ScreenKB,         ShowFor: "employee"},
    {Name: "Admin Panel",       Icon: Icon.Settings,   Screen: ScreenAdmin,      ShowFor: "admin"}
);
```

---

## 4. SCREEN-BY-SCREEN BUILD GUIDE

---

### SCREEN: Layout (Sidebar + Header)

> **Tip:** In Power Apps, create the Sidebar and Header as a **Component** so you reuse it on every screen.

#### Sidebar Component
1. Go to **Components** tab → **New Component** → Name: `cmpSidebar`
2. Set Width: `250`, Height: `App.Height`
3. Add **Rectangle** as background: Fill = `RGBA(0, 51, 141, 1)` (KPMG Blue)
4. Add **Image** control: `Image = "/kpmg-logo.svg"`, Y = 20, Height = 40
5. Add **Label**: "Automation Hub", Color = White, FontWeight = Bold
6. Add **Vertical Gallery**: `glyNavMenu`
   - Items:
     ```
     Filter(colNavItems,
         ShowFor = "all" ||
         (ShowFor = "employee" && !varIsLeadership && !varIsAdmin) ||
         (ShowFor = "leadership" && varIsLeadership) ||
         (ShowFor = "admin" && varIsAdmin)
     )
     ```
   - Inside gallery template:
     - Label for name: `ThisItem.Name`
     - Icon: `ThisItem.Icon`
     - OnSelect: `Navigate(ThisItem.Screen, ScreenTransition.Fade)`
     - Fill for active item: `If(App.ActiveScreen = ThisItem.Screen, RGBA(255,255,255,0.15), Transparent)`

#### Header Component
1. Add **Rectangle**: Width = `App.Width - 250`, Height = 64, Fill = White
2. Add **Text Input** (Search): Placeholder = `"Search requests..."`
3. Add **Icon** (Bell notification)
4. Add **Label**: `varCurrentUser.FullName`
5. Add **Image** for avatar: `varCurrentUser.Image`
6. Add **Role Switcher** (only for prototype demo):
   - **Dropdown** with Items: `["Employee View", "Leadership View", "Admin View"]`
   - OnChange: `Set(varDemoRole, Self.SelectedText.Value)`

---

### SCREEN: Dashboard

#### Employee View
```
// KPI Cards — wrap each in a Container

// Card 1: My Open Requests
lblMyOpenCount.Text =
    Text(
        CountRows(Filter(Automation_Requests, SubmittedBy.Email = varCurrentUser.Email, Status.Value <> "Completed"))
    )

// Card 2: Ideas Submitted  
lblIdeasCount.Text =
    Text(CountRows(Filter(Innovation_Ideas, PostedBy.Email = varCurrentUser.Email)))

// Card 3: My Time Saved
lblTimeSaved.Text =
    Text(
        Sum(
            Filter(Automation_Requests, AssignedTo.Email = varCurrentUser.Email, Status.Value = "Completed"),
            If(Frequency.Value = "Daily", 250, If(Frequency.Value = "Weekly", 104, 26))
        )
    ) & " hrs"
```

#### Leadership Executive View
```
// Visible only when varIsLeadership = true
// Card: Total Hours Saved
lblTotalSaved.Text =
    Text(Sum(Filter(Automation_Requests, Status.Value = "Completed"),
        If(Frequency.Value = "Daily", 250, If(Frequency.Value = "Weekly", 104, 26))
    )) & " hrs"

// Card: Active Projects
lblActiveProjects.Text =
    Text(CountRows(Filter(Automation_Requests,
        Status.Value = "Picked" || Status.Value = "Development" || Status.Value = "Testing"
    )))
```

#### Recent Activity Gallery
```
glyRecentActivity.Items =
    FirstN(
        SortByColumns(Automation_Requests, "Modified", SortOrder.Descending),
        5
    )
```

---

### SCREEN: Submit Request

#### Layout: 3-Column Horizontal Container

**Column 1 (Problem & Process):**
- Multi-line Text Input: `txtDescription`
- Text Input for steps: `txtStep1`, `txtStep2`
- Button "Add Step": adds to a local collection

**Column 2 (Details):**
- Dropdown Frequency: `ddlFrequency` — Items: `["Daily","Weekly","Monthly","Ad-hoc"]`
- Dropdown Time Spent: `ddlTimeSpent` — Items: `["30 Minutes","1 Hour","2 Hours","More"]`

**Column 3 (Copilot Panel):**

The entire Copilot panel is driven by this formula chain:

**Step 1 — Keyword matching** (on `txtDescription.OnChange`):
```
// Search all rules for a keyword match
UpdateContext({
    locCopilotMatch: LookUp(
        colCopilotRules,
        !IsBlank(Find(Lower(Keyword), Lower(txtDescription.Text)))
    )
});

// Set duplicate flag
UpdateContext({ locIsDuplicate: !IsBlank(locCopilotMatch) && locCopilotMatch.IsDuplicate });

// Show type toggle banner if duplicate found
UpdateContext({ locShowTypeToggle: locIsDuplicate });
```

**Step 2 — Display Copilot recommendation:**
```
// Recommendation label
lblCopilotTech.Text = If(IsBlank(locCopilotMatch), "—", locCopilotMatch.SuggestedTech)
lblCopilotComp.Text = If(IsBlank(locCopilotMatch), "—", locCopilotMatch.Complexity)
lblCopilotTime.Text = If(IsBlank(locCopilotMatch), "—", locCopilotMatch.Timeline)
lblCopilotMsg.Text  = If(IsBlank(locCopilotMatch),
    "Start typing your description to get a recommendation.",
    locCopilotMatch.Message
)

// ROI — based on user's frequency selection
lblCopilotROI.Text = Switch(ddlFrequency.Selected.Value,
    "Daily",   "Very High (~250 hrs/yr)",
    "Weekly",  "High (~104 hrs/yr)",
    "Monthly", "Medium (~26 hrs/yr)",
    "Medium"
)
```

**Step 3 — Duplicate Warning Card:**
```
// Visible property
cntDuplicateWarning.Visible = locIsDuplicate

// Text labels inside the warning card
lblDuplicateMsg.Text =
    locCopilotMatch.ProjectName & " already exists (built by " &
    locCopilotMatch.OriginalDeveloper.DisplayName & ")."

lblAutoAssign.Text =
    "✓ Select Enhancement Request to auto-assign to " &
    locCopilotMatch.OriginalDeveloper.DisplayName &
    " and link as " & locCopilotMatch.OriginalRequestRef & "-v2.0"
```

**Step 4 — Request Type Toggle:**
```
// Show/hide
cntTypeToggle.Visible = locShowTypeToggle

// Radio buttons: rdoNew and rdoEnhancement
// Enhancement section visibility
cntEnhancementFields.Visible = rdoEnhancement.Value

// "Why Not Enough" for New Request when duplicate found
cntWhyNotEnough.Visible = locIsDuplicate && rdoNew.Value
```

**Step 5 — Submit Button:**
```
btnSubmit.OnSelect:

// Validation check
If(
    IsBlank(txtDescription.Text) || IsBlank(ddlFrequency.Selected.Value),
    Notify("Please fill in all required fields", NotificationType.Warning),

    // Submit the record
    Patch(Automation_Requests,
        Defaults(Automation_Requests),
        {
            RequestTitle:       txtTitle.Text,
            Description:        txtDescription.Text,
            CurrentSteps:       txtStep1.Text & Char(10) & txtStep2.Text,
            RequestType:        {Value: If(rdoEnhancement.Value, "Enhancement Request", "New Request")},
            ParentRequestID:    If(rdoEnhancement.Value, locCopilotMatch.ID, 0),
            ParentProjectName:  If(rdoEnhancement.Value, locCopilotMatch.ProjectName, ""),
            AssignedTo:         If(rdoEnhancement.Value,
                                    {Claims: "i:0#.f|membership|" & locCopilotMatch.OriginalDeveloper.Email},
                                    Blank()
                                ),
            Status:             {Value: "Open"},
            Frequency:          {Value: ddlFrequency.Selected.Value},
            TimeSpent:          {Value: ddlTimeSpent.Selected.Value},
            IdealSolution:      txtIdealSolution.Text,
            WhyNotEnough:       txtWhyNotEnough.Text,
            AITech:             If(IsBlank(locCopilotMatch), "", locCopilotMatch.SuggestedTech),
            AIComplexity:       {Value: If(IsBlank(locCopilotMatch), "Medium", locCopilotMatch.Complexity)},
            AITimeline:         If(IsBlank(locCopilotMatch), "2-3 Weeks", locCopilotMatch.Timeline),
            AIDuplicate:        If(locIsDuplicate, locCopilotMatch.ProjectName, ""),
            SubmittedBy:        {Claims: "i:0#.f|membership|" & varCurrentUser.Email}
        }
    );
    Notify("Request submitted successfully!", NotificationType.Success);
    Navigate(ScreenMyRequests, ScreenTransition.Fade)
)
```

---

### SCREEN: Browse Requests (Kanban)

#### 5-Column Kanban Layout
- 1 Horizontal Container with 5 child Vertical Containers.
- Each container has a **Vertical Gallery**.

```
// Column 1 Gallery Items
glyOpen.Items = Filter(Automation_Requests, Status.Value = "Open")

// Column 2
glyPicked.Items = Filter(Automation_Requests, Status.Value = "Picked")

// Column 3
glyDev.Items = Filter(Automation_Requests, Status.Value = "Development")

// Column 4
glyTest.Items = Filter(Automation_Requests, Status.Value = "Testing")

// Column 5
glyDone.Items = Filter(Automation_Requests, Status.Value = "Completed")
```

#### Card Template OnSelect (opens Detail Modal):
```
UpdateContext({
    varShowTaskModal: true,
    varSelectedTask: ThisItem
})
```

#### Task Detail Modal Container:
```
cntTaskModal.Visible = varShowTaskModal

// Labels inside modal
lblModalID.Text          = varSelectedTask.ID
lblModalTitle.Text       = varSelectedTask.RequestTitle
lblModalDesc.Text        = varSelectedTask.Description
lblModalCopilotTech.Text = varSelectedTask.AITech
lblModalCopilotComp.Text = varSelectedTask.AIComplexity.Value
lblModalCopilotTime.Text = varSelectedTask.AITimeline
lblModalDev.Text         = varSelectedTask.AssignedTo.DisplayName
```

#### "Pick This Task" Button:
```
btnPickTask.Visible = varSelectedTask.Status.Value = "Open"

btnPickTask.OnSelect:
Patch(Automation_Requests,
    varSelectedTask,
    {
        AssignedTo: {Claims: "i:0#.f|membership|" & varCurrentUser.Email},
        Status: {Value: "Picked"}
    }
);
UpdateContext({ varShowTaskModal: false });
Refresh(Automation_Requests)
```

#### "Mark as Duplicate" Button:
```
btnMarkDuplicate.Visible = varSelectedTask.Status.Value = "Open"

btnMarkDuplicate.OnSelect:
Patch(Automation_Requests,
    varSelectedTask,
    { Status: {Value: "Duplicate"} }
);
UpdateContext({ varShowTaskModal: false });
Refresh(Automation_Requests)
```

---

### SCREEN: My Requests

#### Table Gallery:
```
glyMyRequests.Items =
    SortByColumns(
        Filter(Automation_Requests, SubmittedBy.Email = varCurrentUser.Email),
        "Created", SortOrder.Descending
    )
```

#### View Popup:
```
cntMyReqModal.Visible = varShowMyReqModal

btnViewReq.OnSelect:
UpdateContext({ varShowMyReqModal: true, varSelectedReq: ThisItem })

// Progress Bar width formula
rectProgress.Width =
    (varSelectedReq.Progress / 100) * Parent.Width

// Color: green if 100%, blue otherwise
rectProgress.Fill =
    If(varSelectedReq.Progress = 100, RGBA(0,184,148,1), RGBA(0,51,141,1))

// Show progress section only if status is not "Open"
cntProgressSection.Visible = varSelectedReq.Status.Value <> "Open"
```

---

### SCREEN: My Picked Tasks

#### Gallery:
```
glyMyTasks.Items =
    Filter(Automation_Requests,
        AssignedTo.Email = varCurrentUser.Email,
        Status.Value <> "Completed"
    )
```

#### Progress Bar on card:
```
rectTaskProgress.Width = (ThisItem.Progress / 100) * Parent.Width
lblTaskProgress.Text = Text(ThisItem.Progress) & "%"
```

#### "Update Progress" Button → Opens Popup:
```
btnUpdateProgress.OnSelect:
UpdateContext({
    varShowProgressModal: true,
    varSelectedTask: ThisItem,
    varNewProgress: ThisItem.Progress,
    varProgressNote: ""
})
```

#### Inside Update Progress Modal:
```
// Slider control
sldProgress.Default = varNewProgress
sldProgress.Min = 0
sldProgress.Max = 100
sldProgress.Step = 5

// Live label
lblSliderValue.Text = Text(sldProgress.Value) & "%"

// Save Button
btnSaveProgress.OnSelect:
Patch(Automation_Requests,
    varSelectedTask,
    {
        Progress: sldProgress.Value,
        ProgressNotes: txtProgressNote.Text,
        Status: {Value: If(sldProgress.Value = 100, "Testing", varSelectedTask.Status.Value)}
    }
);
UpdateContext({ varShowProgressModal: false });
Refresh(Automation_Requests)
```

#### "Mark Complete" Button:
```
btnMarkComplete.OnSelect:
Patch(Automation_Requests,
    varSelectedTask,
    {
        Progress: 100,
        Status: {Value: "Completed"}
    }
);
// This triggers the Points Engine Flow automatically
Refresh(Automation_Requests)
```

---

### SCREEN: Innovation Board

#### Ideas Gallery:
```
glyIdeas.Items =
    SortByColumns(Innovation_Ideas, "Votes", SortOrder.Descending)
```

#### Upvote Button (inside gallery):
```
btnUpvote.OnSelect:
Patch(Innovation_Ideas,
    ThisItem,
    { Votes: ThisItem.Votes + 1 }
)
```

#### "Post an Idea" Button → Opens Popup:
```
btnPostIdea.OnSelect:
UpdateContext({
    varShowIdeaModal: true,
    varIdeaTitle: "",
    varIdeaDuplicate: Blank()
})
```

#### Duplicate Detection inside modal (txtIdeaTitle.OnChange):
```
UpdateContext({
    varIdeaDuplicate: LookUp(
        Innovation_Ideas,
        !IsBlank(Find(Lower(txtIdeaTitle.Text), Lower(Title)))
    )
})

// Warning banner
cntIdeaWarning.Visible = !IsBlank(varIdeaDuplicate)
lblIdeaWarning.Text =
    "⚠️ Similar Idea Exists: """ & varIdeaDuplicate.Title &
    """. Consider upvoting it instead!"
```

#### Submit Idea Button:
```
btnSubmitIdea.OnSelect:
Patch(Innovation_Ideas,
    Defaults(Innovation_Ideas),
    {
        Title: txtIdeaTitle.Text,
        Description: txtIdeaDesc.Text,
        PostedBy: {Claims: "i:0#.f|membership|" & varCurrentUser.Email},
        Votes: 0
    }
);
UpdateContext({ varShowIdeaModal: false });
Refresh(Innovation_Ideas)
```

---

### SCREEN: Leaderboard

#### Sorted Gallery:
```
glyLeaderboard.Items =
    SortByColumns(User_Stats, "TotalPoints", SortOrder.Descending)
```

#### Rank Number:
```
lblRank.Text = Text(CountRows(Filter(User_Stats, TotalPoints >= ThisItem.TotalPoints)))
```

#### Badge Color:
```
lblBadge.Color = Switch(ThisItem.Badge,
    "Automation Hero",  RGBA(241,196,15,1),   // Gold
    "Flow Expert",      RGBA(189,195,199,1),  // Silver
    "Cloud Code Master",RGBA(205,127,50,1),   // Bronze
    RGBA(114,19,234,1)                         // Purple default
)
```

---

### SCREEN: Reports
- Embed a **Power BI Tile** from a Power BI report connected to the `Automation_Requests` list.
- Use Power BI → Get Data → SharePoint List → Connect to `Automation_Requests`.
- Create visuals: Pie chart (by department), Bar chart (requests by month), KPI cards.
- In Power Apps: Insert → **Power BI Tile** → Select your workspace and report.

---

### SCREEN: Knowledge Base
```
glyArticles.Items = Knowledge_Articles

// Filter by type
glyVideos.Items = Filter(Knowledge_Articles, Type.Value = "Video")
glyDocs.Items   = Filter(Knowledge_Articles, Type.Value = "Article")

// Open link button
btnOpenArticle.OnSelect:
Launch(ThisItem.Link)
```

---

### SCREEN: Admin Panel

#### Copilot Rules Gallery:
```
glyRules.Items = Copilot_Rules

// Edit a rule
btnEditRule.OnSelect:
EditForm(formEditRule);
UpdateContext({ varSelectedRule: ThisItem, varShowRuleModal: true })

// Save rule
btnSaveRule.OnSelect:
SubmitForm(formEditRule);
UpdateContext({ varShowRuleModal: false });
Refresh(Copilot_Rules)

// Delete rule
btnDeleteRule.OnSelect:
Remove(Copilot_Rules, ThisItem);
Refresh(Copilot_Rules)
```

---

## 5. POWER AUTOMATE FLOWS

Go to **flow.microsoft.com** and create each flow.

---

### FLOW 1: Enhancement Request — Auto Assignment
**Trigger:** When an item is created in `Automation_Requests`

```
Step 1: Trigger
  - When an item is created (SharePoint)
  - Site: [Your Site]
  - List: Automation_Requests

Step 2: Condition
  - RequestType equals "Enhancement Request"
  - AND ParentRequestID is not equal to 0

Step 3 (If Yes): Get item from Copilot_Rules
  - Site: [Your Site]
  - List: Copilot_Rules
  - Filter: ID equals @{triggerBody()?['ParentRequestID']}

Step 4: Update the new request
  - Action: Update item (SharePoint)
  - List: Automation_Requests
  - ID: @{triggerBody()?['ID']}
  - AssignedTo: @{outputs('Get_item')?['body/OriginalDeveloper/Email']}

Step 5: Send Teams notification to developer
  - Action: Post message in Teams chat (as Flow bot)
  - Recipient: @{outputs('Get_item')?['body/OriginalDeveloper/Email']}
  - Message:
    "📌 New Enhancement Request Assigned!
    Project: @{outputs('Get_item')?['body/ProjectName']}
    Reference: @{outputs('Get_item')?['body/OriginalRequestRef']}-v2.0
    Submitted by: @{triggerBody()?['SubmittedBy/DisplayName']}
    Please review and pick it up in Automation Hub."
```

---

### FLOW 2: Points & Badges Engine
**Trigger:** When an item is modified in `Automation_Requests`

```
Step 1: Trigger
  - When an item is modified (SharePoint)
  - Site: [Your Site]
  - List: Automation_Requests

Step 2: Condition
  - Status/Value equals "Completed"

Step 3 (If Yes): Calculate Points Earned
  - Compose: 
    @{if(equals(triggerBody()?['Frequency/Value'], 'Daily'), 500,
       if(equals(triggerBody()?['Frequency/Value'], 'Weekly'), 300, 100))}

Step 4: Get developer's current stats
  - Action: Get items (SharePoint)
  - List: User_Stats
  - Filter: Employee/Email eq '@{triggerBody()?['AssignedTo/Email']}'

Step 5: Calculate new total
  - Compose: @{add(int(outputs('Get_items')?['body/value'][0]?['TotalPoints']), outputs('Points_Earned'))}

Step 6: Calculate new badge
  - Compose (Switch on new total):
    >= 5000 → "Automation Hero"
    >= 3000 → "Flow Expert"
    >= 1000 → "Rising Star"
    default → "Innovator"

Step 7: Update User_Stats
  - Action: Update item (SharePoint)
  - List: User_Stats
  - ID: @{outputs('Get_items')?['body/value'][0]?['ID']}
  - TotalPoints: @{outputs('New_Total')}
  - Badge: @{outputs('New_Badge')}
  - LastUpdated: @{utcNow()}

Step 8: Condition — Did badge change?
  - Previous Badge vs New Badge
  - If Yes: Send Teams celebration message
    "🏆 Congratulations @{triggerBody()?['AssignedTo/DisplayName']}!
    You've earned a new badge: @{outputs('New_Badge')}!
    Keep up the great work on Automation Hub!"
```

---

### FLOW 3: Status Change — Notify Requester
**Trigger:** When an item is modified in `Automation_Requests`

```
Step 1: Trigger
  - When an item is modified

Step 2: Condition
  - Status changed (compare with previous value using triggerOutputs)

Step 3 (If Yes): Send Email
  - To: @{triggerBody()?['SubmittedBy/Email']}
  - Subject: "Update on your request: @{triggerBody()?['RequestTitle']}"
  - Body:
    "Hi @{triggerBody()?['SubmittedBy/DisplayName']},
    
    Your automation request has been updated.
    
    Request: @{triggerBody()?['RequestTitle']}
    New Status: @{triggerBody()?['Status/Value']}
    Progress: @{triggerBody()?['Progress']}%
    Assigned To: @{triggerBody()?['AssignedTo/DisplayName']}
    
    Login to Automation Hub to view details."
```

---

## 6. ROLE-BASED ACCESS (RBAC)

### Step 1: Create Groups in Microsoft Entra ID
1. Go to **portal.azure.com** → Azure Active Directory → Groups
2. Create: `AutomationHub_Leadership` — Add leadership members
3. Create: `AutomationHub_Admins` — Add admin members
4. Copy each group's **Object ID** (GUID)

### Step 2: Use Group IDs in App.OnStart
Replace `"YOUR_LEADERSHIP_GROUP_ID"` and `"YOUR_ADMIN_GROUP_ID"` in the `App.OnStart` formula above with the actual GUIDs.

### Step 3: Screen-level visibility
On each screen, set the `Visible` property or add a navigation lock:
```
// Reports screen — only for leadership
ScreenReports.OnVisible:
If(!varIsLeadership, Navigate(ScreenDashboard, ScreenTransition.None))

// Admin screen — only for admin
ScreenAdmin.OnVisible:
If(!varIsAdmin, Navigate(ScreenDashboard, ScreenTransition.None))
```

---

## 7. ADMIN: MANAGING COPILOT RULES

The entire "AI" of this application is controlled by the `Copilot_Rules` SharePoint list. No code changes needed.

**To add a new duplicate detection rule:**
1. Open SharePoint → `Copilot_Rules` list
2. Click **+ New**
3. Fill in:
   - **Keyword:** the word to match (e.g. "qr code")
   - **ProjectName:** the existing project (e.g. "QR Scanner App")
   - **OriginalDeveloper:** the person who built it
   - **SuggestedTech:** what tech to recommend
   - **IsDuplicate:** Yes

That's it. The app will automatically start flagging that keyword without any app change.

---

## 8. COMPLETE FORMULA REFERENCE

| Formula Purpose | Power Fx Formula |
|---|---|
| Current User | `User().FullName` or `User().Email` |
| Filter by current user | `Filter(List, Person.Email = User().Email)` |
| Count rows | `CountRows(Filter(List, condition))` |
| Sum a column | `Sum(Filter(List, condition), ColumnName)` |
| Sort descending | `SortByColumns(List, "Column", SortOrder.Descending)` |
| Find keyword | `!IsBlank(Find(Lower("keyword"), Lower(textinput.Text)))` |
| Patch (create) | `Patch(List, Defaults(List), { Column: Value })` |
| Patch (update) | `Patch(List, LookUp(List, ID = varItem.ID), { Column: Value })` |
| Navigate | `Navigate(ScreenName, ScreenTransition.Fade)` |
| Show/hide modal | `UpdateContext({ varShowModal: true, varSelected: ThisItem })` |
| Progress bar width | `(Progress / 100) * Parent.Width` |
| Conditional color | `If(condition, Color1, Color2)` |
| Switch badge | `Switch(Badge, "Hero", Gold, "Expert", Silver, Purple)` |
| Notify user | `Notify("Message", NotificationType.Success)` |
| Launch URL | `Launch(url)` |
| Format date | `Text(DateColumn, "dd mmm yyyy")` |
| Days until deadline | `DateDiff(Today(), Deadline, Days)` |

---

**Document Version:** 3.0 — Complete Build Reference
**Last Updated:** July 2026
**For:** Automation Hub Power Apps Implementation
