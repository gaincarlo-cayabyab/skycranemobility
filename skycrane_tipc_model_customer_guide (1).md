# SkyCrane TIPC Economic Savings Model: Step-by-Step Customer Guide & Case Study

Welcome to the **Total Installed Project Cost (TIPC) Economic Savings Model** documentation. This guide is designed for project engineers, procurement managers, and operations directors who need to evaluate the financial and operational advantages of **SkyCrane Heavy-Lift Aerial Cargo** over conventional ground-based freight.

---

## 1. Executive Summary & Core Concept

When evaluating remote infrastructure projects—such as solar installations, cellular tower deployments, transmission line maintenance, or off-grid construction—traditional procurement processes often focus exclusively on **Freight Cost Per Kilometer ($C_{\text{km}}$)**.

This conventional metric creates a major oversight by ignoring **hidden site-preparation and operational delay costs**. Traditional ground transport in difficult terrain often requires clearing access roads, hiring manual labor teams for hill carry, renting heavy specialized machinery, and paying environmental rehabilitation penalties.

### The TIPC Paradigm
**Total Installed Project Cost (TIPC)** measures the total expenditure required to transport cargo from a primary staging hub and land it directly onto its final operational mounting point.

$$\text{TIPC} = \text{Direct Transport Fee} + \text{Civil Works \& Site Access} + \text{Labor \& Rigging} + \text{Delay Penalties} + \text{Environmental Restoration}$$

By utilizing **SkyCrane Aerial Delivery**, ground infrastructure costs drop to near zero. Cargo flies above terrain obstacles, delivering equipment directly to the drop zone in hours rather than weeks.

---

## 2. Mathematical Framework & Formulas

To ensure rigorous financial evaluation, the TIPC calculator models two distinct pathways:

### Path A: Conventional Ground Freight TIPC

$$\text{TIPC}_{\text{Ground}} = C_{\text{haulage}} + C_{\text{prep}} + C_{\text{labor}} + C_{\text{delay}} + C_{\text{restoration}}$$

Where:
* $C_{\text{haulage}}$: Vehicle rental fees, driver wages, fuel costs, and permits for flatbed/4x4 trucks.
* $C_{\text{prep}}$: Bulldozer clearing, tree cutting, gravel packing, temporary road construction, and culvert installation.
* $C_{\text{labor}}$: Ground rigging, manual carry/portering teams, manual winch operations, and safety oversight hours.
* $C_{\text{delay}}$: Downtime penalties caused by mud, steep incline traction loss, vehicle breakdowns, or narrow path constraints ($\text{Days Delayed} \times \text{Daily Burn Rate}$).
* $C_{\text{restoration}}$: Right-of-Way (ROW) access fees, land disturbance fines, and post-project site re-vegetation expenses.

### Path B: SkyCrane Heavy-Lift Aerial Corridor TIPC

$$\text{TIPC}_{\text{SkyCrane}} = C_{\text{flight}} + C_{\text{staging}} + C_{\text{rigging}}$$

Where:
* $C_{\text{flight}}$: Direct UAV flight sortie cycles ($\text{Number of Flights} \times \text{Rate per Sortie}$).
* $C_{\text{staging}}$: Minimal staging pad setup ($10\text{m} \times 10\text{m}$ clear flat area) and localized safety perimeter fencing.
* $C_{\text{rigging}}$: Certified flight rigging master, precision drop-zone spotters, and automated hook release systems.

### Net Economic Savings ($\Delta \text{TIPC}$) & ROI

$$\Delta \text{TIPC} = \text{TIPC}_{\text{Ground}} - \text{TIPC}_{\text{SkyCrane}}$$

$$\text{ROI (\%)} = \left( \frac{\Delta \text{TIPC}}{\text{TIPC}_{\text{Ground}}} \right) \times 100$$

---

## 3. Step-by-Step Instructions: How to Use the Calculator

Follow these five steps to compute your site-specific TIPC comparison:

```
+-------------------------------------------------------------------+
| STEP 1: Enter Baseline Payload Parameters                         |
| - Total Freight Weight (Metric Tons)                              |
| - Total Distance from Staging Hub to Drop Zone (km)               |
+-------------------------------------------------------------------+
                                 │
                                 ▼
+-------------------------------------------------------------------+
| STEP 2: Select Terrain Corridor & Incline Profile                 |
| - Flat / Paved (0% - 5%)        - Steep Incline (15% - 30%)      |
| - Rolling Hills (5% - 15%)      - Off-Grid / Canyon / Island    |
+-------------------------------------------------------------------+
                                 │
                                 ▼
+-------------------------------------------------------------------+
| STEP 3: Input Ground Construction & Prep Factors                  |
| - Temporary Road Requirements (km needed)                         |
| - Environmental Clearance / Right-of-Way Access Level             |
+-------------------------------------------------------------------+
                                 │
                                 ▼
+-------------------------------------------------------------------+
| STEP 4: Define Schedule & Labor Crew Parameters                   |
| - Estimated Manual Porter Crew Size                               |
| - Projected Ground Transit Delays (Days)                          |
+-------------------------------------------------------------------+
                                 │
                                 ▼
+-------------------------------------------------------------------+
| STEP 5: Review Dynamic Financial Summary & Project Schedule       |
| - Instant Cost Comparison Table                                   |
| - Time-to-Completion Reduction Chart                              |
| - PDF Report Export for Stakeholder Approval                      |
+-------------------------------------------------------------------+
```

---

## 4. Detailed Worked Example: Remote Telecom/Solar Site Case Study

To see the model in action, consider a real-world scenario in an off-grid mountainous region.

### Project Scenario Parameters
* **Project Type:** Off-grid Telecom Expansion / Microgrid Solar Substation Installation
* **Total Equipment Mass:** $12.5 \text{ Metric Tons}$ (Lithium battery banks, framing steel, solar modules, generator units)
* **Radial Distance:** $6.5 \text{ km}$ from the nearest paved highway to the mountain ridge drop zone
* **Terrain Corridor Profile:** Steep Off-Grid Mountain Incline ($22\%$ grade, zero existing vehicle access roads)

---

### Cost Breakdown Comparison

#### 1. Conventional Ground Transport Pathway

1. **Temporary Access Road Construction:**
   * Requires cutting a $3.2 \text{ km}$ dirt track through timberland and rock.
   * Bulldozer + Excavator rental for 6 days @ $\text{PHP } 85,000/\text{day} = \text{PHP } 510,000$.
   * Gravel infill & culvert crossing: $\text{PHP } 240,000$.
   * *Subtotal Access Road:* **$\text{PHP } 750,000$**

2. **Manual Haulage & Portering Labor:**
   * Due to mud and narrow paths, $4.5 \text{ MT}$ of sub-components must be manually carried or winched.
   * Crew of 16 laborers over 8 days @ $\text{PHP } 1,200/\text{day/person} = \text{PHP } 153,600$.
   * Site safety supervisors & rigging technicians: $\text{PHP } 120,000$.
   * *Subtotal Labor:* **$\text{PHP } 273,600$**

3. **Ground Freight Vehicles & Idle Penalties:**
   * 4x4 Off-road tractor-trailer rentals: $\text{PHP } 320,000$.
   * 3-day weather delay penalty (stuck trucks in mud, idle rental rates): $\text{PHP } 135,000$.
   * *Subtotal Vehicle & Delay:* **$\text{PHP } 455,000$**

4. **Environmental Rehabilitation & Right-of-Way (ROW) Fees:**
   * Local LGU / DENR land disturbance permits & replanting bonds: $\text{PHP } 280,000$.
   * *Subtotal Restoration:* **$\text{PHP } 280,000$**

$$\mathbf{\text{TIPC}_{\text{Ground}} = \text{PHP } 750,000 + \text{PHP } 273,600 + \text{PHP } 455,000 + \text{PHP } 280,000 = \text{PHP } 1,758,600}$$

---

#### 2. SkyCrane Heavy-Lift Aerial Pathway

1. **Aerial Flight Sortie Operations:**
   * Total Cargo Mass: $12.5 \text{ MT}$ ($12,500 \text{ kg}$).
   * Payload capacity per flight: $500 \text{ kg}$ per heavy-lift flight cycle.
   * Required Flight Cycles: $\frac{12,500}{500} = 25 \text{ flight sorties}$.
   * Sortie rate (includes UAV, pilot team, fuel, telemetry): $25 \text{ sorties} \times \text{PHP } 28,000 = \text{PHP } 700,000$.
   * *Subtotal Flight Operations:* **$\text{PHP } 700,000$**

2. **Staging & Ground Safety Team:**
   * Staging Pad setup at highway base (1 day setup): $\text{PHP } 45,000$.
   * Precision landing pad spotters & certified rigging master (2 days): $\text{PHP } 65,000$.
   * *Subtotal Staging & Crew:* **$\text{PHP } 110,000$**

3. **Permitting & Airspace Clearance:**
   * Flight path notification, CAAP airspace coordination, and flight risk insurance: $\text{PHP } 75,000$.
   * *Subtotal Permitting:* **$\text{PHP } 75,000$**

$$\mathbf{\text{TIPC}_{\text{SkyCrane}} = \text{PHP } 700,000 + \text{PHP } 110,000 + \text{PHP } 75,000 = \text{PHP } 885,000}$$

---

### Executive Financial & Operational Comparison Summary

| Metric / Evaluation Line Item | Conventional Ground Freight | SkyCrane Aerial Logistics | Differential / Customer Advantage |
| :--- | :--- | :--- | :--- |
| **Total Project Expenditure (TIPC)** | **$\text{PHP } 1,758,600$** | **$\text{PHP } 885,000$** | **$\text{PHP } 873,600 \text{ Saved}$** |
| **Project Duration** | **14 Days** | **2 Days** | **$85.7\%$ Schedule Compression** |
| **Access Road Construction** | $3.2 \text{ km Built}$ | $0 \text{ km (Zero Infrastructure)}$ | **$100\%$ Cost & Time Elimination** |
| **On-Site Labor Required** | 16 Personnel | 4 Flight Operations Specialists | **$75\%$ Labor Risk Exposure Reduction** |
| **Environmental Disturbance** | High (Cutting & Grading) | Zero Ground Contact | **$100\%$ Eco-Compliant / Zero Penalties** |
| **Net Financial ROI** | Baseline ($0\%$) | **$49.7\%$ Direct Savings** | **$\approx 50\%$ Capital Savings** |

---

## 5. Parameter Definitions & Cost Variable Matrix

When inputting custom project data, refer to these field definitions:

* **Cargo Unit Weight ($\text{kg}$):** Individual weight of non-divisible assets (e.g., generator, inverter, battery rack). Determines drone lift class required.
* **Corridor Elevation Gradient ($\%$):** Measured incline from staging point to drop site. Incline $>15\%$ triggers steep ground transport cost multipliers.
* **Right-of-Way (ROW) Risk Factor:** Flag indicating if ground trucks must cross private property or protected forests, incurring legal or permitting delays.
* **Daily Idle Burn Rate:** Cost per day incurred when heavy ground machinery or crews are stranded due to weather or landslides.
* **Sortie Turnaround Time:** Elapsed time for a drone to load, ascend, fly, drop, and return to staging (typically 8–15 minutes per round trip).

---

## 6. Pre-Flight Planning Checklist for Engineering Teams

Before executing a project using the SkyCrane TIPC model, confirm the following site conditions:

- [ ] **Staging Area Coordinates:** Flat $10\text{m} \times 10\text{m}$ area accessible by standard transport trucks.
- [ ] **Drop Zone Clearance:** Minimum $5\text{m} \times 5\text{m}$ clear area for precision vertical positioning or winched drop.
- [ ] **Obstacle Mapping:** High-voltage power lines, dense canopy, or cliff faces logged for automated flight path routing.
- [ ] **Payload Packaging:** Cargo placed in standardized lifting slings or modular flight crates with certified pick-points.
- [ ] **Local Airspace Approval:** NOTAM issued and local authority flight clearances completed.

---

*Document prepared by SkyCrane Aerial Logistics Engineering Team.*  
*For questions or custom API integrations with your ERP, contact the Antigravity Technical Integration Desk.*