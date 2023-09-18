import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilBriefcase,
  cilCalculator,
  cilChartPie,
  cilChatBubble,
  cilCursor,
  cilDescription,
  cilDrop,
  cilHome,
  cilIndustry,
  cilInfo,
  cilLightbulb,
  cilNotes,
  cilPencil,
  cilPenNib,
  cilPuzzle,
  cilSpeech,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
  // {
  //   component: CNavItem,
  //   name: "Dashboard",
  //   to: "/dashboard",
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Pages',
  },
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'About Us',
    to: '/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Industries',
    to: '/industries',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Bank & NBFI',
    //     to: '/industries/bank-and-nbfi',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Telecommunications',
    //     to: '/industries/telecommunications',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Payment Card Industry',
    //     to: '/industries/payment-card-industry',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Educational Institutions',
    //     to: '/industries/educational-institutions',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Ecommerce & Retail Merchants',
    //     to: '/industries/ecommerce-and-retail-merchants',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Health Care',
    //     to: '/industries/health-care',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Partners',
    to: '/partners',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Services',
    to: '/services',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Managed Services',
  //   to: '/managed-services',
  //   icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Solutions',
    to: '/solution',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Training',
    to: '/training',
    icon: <CIcon icon={cilPenNib} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Careers',
    to: '/career',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Contact Us',
    to: '/contact',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
  },

];

export default _nav;
