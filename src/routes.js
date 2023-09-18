import React from "react";
import AddTeamMember from "./views/about/add-team-member";
import ManageAbout from "./views/about/manage-about";
import Careers from "./views/careers";
import AddCareer from "./views/careers/AddCareer";
import AddAssociation from "./views/home/home-forms/AddAssociation";
import AddClient from "./views/home/home-forms/AddClient";
import AddClientFeedback from "./views/home/home-forms/AddClientFeedback";
import AddHero from "./views/home/home-forms/AddHero";
import AddPartner from "./views/home/home-forms/AddPartner";
import AddService from "./views/home/home-forms/AddService";
import Home from "./views/home/manage-home";
import BankAndNBFI from "./views/industries/BankAndNBFI";
import EcommerceAndRetailMerchants from "./views/industries/EcommerceAndRetailMerchants";
import EducationalInstitutions from "./views/industries/EducationalInstitutions";
import AddIndustry from "./views/industries/AddIndustry";
import PaymentCardIndustry from "./views/industries/PaymentCardIndustry";
import Telecommunications from "./views/industries/Telecommunications";
import AddAssociationPartner from "./views/partners/AddAssociationPartner";
import AddServicePartner from "./views/partners/AddServicePartner";
import AddSolutionPartner from "./views/partners/AddSolutionPartner";
import ManagePartners from "./views/partners/ManagePartners";
import AddManagementSolution from "./views/solutions/AddManagementSolution";
import AddSecurityAssessment from "./views/solutions/AddSecurityAssessment";
import ManageSolutions from "./views/solutions/ManageSolutions";
import AddAssessmentTraining from "./views/training/AddAssessmentTraining";
import AddCustomizedTraining from "./views/training/AddCustomizedTraining";
import AddManagementTraining from "./views/training/AddManagementTraining";
import ManageTraining from "./views/training/ManageTraining";
import ManageServices from './views/services/ManageService';
import AddSecurityTraining from "./views/training/AddSecurityTraining";
import AddAuditingService from './views/services/AddAuditingService';
import AddCertificationService from './views/services/AddCertificationService';
import AddConsultationService from './views/services/AddConsultationService';
import AddManagedService from './views/services/AddManagedService';
import AddSecurityTestingService from './views/services/AddSecurityTestingService';
import ManageIndustries from "./views/industries/ManageIndustries";

import Contact from "./views/contact";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

// Base
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Paginations")
);
const Placeholders = React.lazy(() =>
  import("./views/base/placeholders/Placeholders")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const Progress = React.lazy(() => import("./views/base/progress/Progress"));
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
const Tables = React.lazy(() => import("./views/base/tables/Tables"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));

// Buttons
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Dropdowns = React.lazy(() =>
  import("./views/buttons/dropdowns/Dropdowns")
);

//Forms
const ChecksRadios = React.lazy(() =>
  import("./views/forms/checks-radios/ChecksRadios")
);
const FloatingLabels = React.lazy(() =>
  import("./views/forms/floating-labels/FloatingLabels")
);
const FormControl = React.lazy(() =>
  import("./views/forms/form-control/FormControl")
);
const InputGroup = React.lazy(() =>
  import("./views/forms/input-group/InputGroup")
);
const Layout = React.lazy(() => import("./views/forms/layout/Layout"));
const Range = React.lazy(() => import("./views/forms/range/Range"));
const Select = React.lazy(() => import("./views/forms/select/Select"));
const Validation = React.lazy(() =>
  import("./views/forms/validation/Validation")
);

const Charts = React.lazy(() => import("./views/charts/Charts"));

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));

// Notifications
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));

const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  // { path: "/dashboard", name: "Dashboard", element: Dashboard },

  { path: "/home", name: "Home", element: Home },
  { path: "/home/hero/add", name: "Add Hero", element: AddHero },
  { path: "/home/service/add", name: "Add Service", element: AddService },
  {
    path: "/home/association/add",
    name: "Add Association",
    element: AddAssociation,
  },
  { path: "/home/partner/add", name: "Add Partner", element: AddPartner },
  { path: "/home/client/add", name: "Add Client", element: AddClient },
  {
    path: "/home/feedback/add",
    name: "Add Client's Feedback",
    element: AddClientFeedback,
  },
  { path: "/home/hero/edit/:id", name: "Edit Hero", element: AddHero },
  { path: "/home/service/edit/:id", name: "Edit Service", element: AddService },
  {
    path: "/home/association/edit/:id",
    name: "Edit Association",
    element: AddAssociation,
  },
  { path: "/home/partner/edit/:id", name: "Edit Partner", element: AddPartner },
  { path: "/home/client/edit/:id", name: "Edit Client", element: AddClient },
  {
    path: "/home/feedback/edit/:id",
    name: "Edit Client's Feedback",
    element: AddClientFeedback,
  },
  { path: "/about", name: "About", element: ManageAbout },
  {
    path: "/about/team-member/add",
    name: "Add Team Member",
    element: AddTeamMember,
  },
  {
    path: "/about/team-member/edit/:id",
    name: "Edit Team Member",
    element: AddTeamMember,
  },
  {
    path: "/industries",
    name: "Industries",
    element: ManageIndustries,
  },
  {
    path: "/industry/add",
    name: "Add Industry",
    element: AddIndustry,
  },
  {
    path: "/industry/edit/:id",
    name: "Edit Industry",
    element: AddIndustry,
  },
  {
    path: "/partners",
    name: "Partners",
    element: ManagePartners,
  },
  {
    path: "/partner/service/add",
    name: "Add Service Partner",
    element: AddServicePartner,
  },
  {
    path: "/partner/solution/add",
    name: "Add Solution Partner",
    element: AddSolutionPartner,
  },
  {
    path: "/partner/association/add",
    name: "Add Partner Association",
    element: AddAssociationPartner,
  },
  {
    path: "/partner/service/edit/:id",
    name: "Edit Service Partner",
    element: AddServicePartner,
  },
  {
    path: "/partner/solution/edit/:id",
    name: "Edit Solution Partner",
    element: AddSolutionPartner,
  },
  {
    path: "/partner/association/edit/:id",
    name: "Edit Partner Association",
    element: AddAssociationPartner,
  },
  {
    path: "/services",
    name: "Services",
    element: ManageServices,
  },
  {
    path: "/add-consultation-service",
    name: "Add Consultation Service",
    element: AddConsultationService,
  },
  {
    path: "/add-auditing-service",
    name: "Add Auditing Service",
    element: AddAuditingService,
  },
  {
    path: "/add-certification-service",
    name: "Add Certification Service",
    element: AddCertificationService,
  },
  {
    path: "/add-managed-service",
    name: "Add Managed Service",
    element: AddManagedService,
  },
  {
    path: "/add-security-testing-service",
    name: "Add Security Testing Service",
    element: AddSecurityTestingService,
  },
  {
    path: "/service/consultation-service/edit/:id",
    name: "Edit Consultation Service",
    element: AddConsultationService,
  },
  {
    path: "/service/auditing-service/edit/:id",
    name: "Edit Auditing Service",
    element: AddAuditingService,
  },
  {
    path: "/service/certification-service/edit/:id",
    name: "Edit Certification Service",
    element: AddCertificationService,
  },
  {
    path: "/service/managed-service/edit/:id",
    name: "Edit Managed Service",
    element: AddManagedService,
  },
  {
    path: "/service/security-testing-service/edit/:id",
    name: "Edit Security Testing Service",
    element: AddSecurityTestingService,
  },
  {
    path: "/solution",
    name: "Solution",
    element: ManageSolutions,
  },
  {
    path: "/solution/security-assessment/add",
    name: "Add Security Assessment",
    element: AddSecurityAssessment,
  },
  {
    path: "/solution/management-solution/add",
    name: "Add Management Solution",
    element: AddManagementSolution,
  },
  {
    path: "/solution/security-assessment/edit/:id",
    name: "Edit Security Assessment Solution",
    element: AddSecurityAssessment,
  },
  {
    path: "/solution/management-solution/edit/:id",
    name: "Edit Cyber security Management Solution",
    element: AddManagementSolution,
  },
  {
    path: "/training",
    name: "Training",
    element: ManageTraining,
  },
  {
    path: "/training/assessment/add",
    name: "Add Assessment",
    element: AddAssessmentTraining,
  },
  {
    path: "/training/management/add",
    name: "Add Management",
    element: AddManagementTraining,
  },
  {
    path: "/training/customized/add",
    name: "Add Customized",
    element: AddCustomizedTraining,
  },
  {
    path: "/training/security/add",
    name: "Add Security",
    element: AddSecurityTraining,
  },
  {
    path: "/training/assessment/edit/:id",
    name: "Edit Assessment",
    element: AddAssessmentTraining,
  },
  {
    path: "/training/management/edit/:id",
    name: "Edit Management",
    element: AddManagementTraining,
  },
  {
    path: "/training/customized/edit/:id",
    name: "Edit Customized",
    element: AddCustomizedTraining,
  },
  {
    path: "/training/security/edit/:id",
    name: "Edit Security",
    element: AddSecurityTraining,
  },
  {
    path: "/career",
    name: "Careers",
    element: Careers,
  },
  {
    path: "/career/add",
    name: "Add Career",
    element: AddCareer,
  },
  {
    path: "/career/edit/:id",
    name: "Edit Career",
    element: AddCareer,
  },
  {
    path: "/contact",
    name: "contact",
    element: Contact,
  },
  // end of righttime routes

  // { path: "/theme", name: "Theme", element: Colors, exact: true },
  // { path: "/theme/colors", name: "Colors", element: Colors },
  // { path: "/theme/typography", name: "Typography", element: Typography },
  // { path: "/base", name: "Base", element: Cards, exact: true },
  // { path: "/base/accordion", name: "Accordion", element: Accordion },
  // { path: "/base/breadcrumbs", name: "Breadcrumbs", element: Breadcrumbs },
  // { path: "/base/cards", name: "Cards", element: Cards },
  // { path: "/base/carousels", name: "Carousel", element: Carousels },
  // { path: "/base/collapses", name: "Collapse", element: Collapses },
  // { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  // { path: "/base/navs", name: "Navs", element: Navs },
  // { path: "/base/paginations", name: "Paginations", element: Paginations },
  // { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  // { path: "/base/popovers", name: "Popovers", element: Popovers },
  // { path: "/base/progress", name: "Progress", element: Progress },
  // { path: "/base/spinners", name: "Spinners", element: Spinners },
  // { path: "/base/tables", name: "Tables", element: Tables },
  // { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  // { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  // { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  // { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  // {
  //   path: "/buttons/button-groups",
  //   name: "Button Groups",
  //   element: ButtonGroups,
  // },
  // { path: "/charts", name: "Charts", element: Charts },
  // { path: "/forms", name: "Forms", element: FormControl, exact: true },
  // { path: "/forms/form-control", name: "Form Control", element: FormControl },
  // { path: "/forms/select", name: "Select", element: Select },
  // {
  //   path: "/forms/checks-radios",
  //   name: "Checks & Radios",
  //   element: ChecksRadios,
  // },
  // { path: "/forms/range", name: "Range", element: Range },
  // { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  // {
  //   path: "/forms/floating-labels",
  //   name: "Floating Labels",
  //   element: FloatingLabels,
  // },
  // { path: "/forms/layout", name: "Layout", element: Layout },
  // { path: "/forms/validation", name: "Validation", element: Validation },
  // { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  // { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  // { path: "/icons/flags", name: "Flags", element: Flags },
  // { path: "/icons/brands", name: "Brands", element: Brands },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   element: Alerts,
  //   exact: true,
  // },
  // { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  // { path: "/notifications/badges", name: "Badges", element: Badges },
  // { path: "/notifications/modals", name: "Modals", element: Modals },
  // { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  // { path: "/widgets", name: "Widgets", element: Widgets },
];

export default routes;
