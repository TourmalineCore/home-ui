export interface LayoutData {
  headerContent: HeaderRedesignProps;
}

export interface HeaderRedesignProps {
  navigationLists: HeaderNavigationItem[];
  buttonLabel: string;
  emailCaption: string;
  emailAddress: string;
  socialLinks: HeaderLink[];
}

export interface HeaderNavigationItem extends HeaderLink {
  navItems: HeaderLink[];
}

interface HeaderLink {
  id: number;
  name: string;
  link: string;
}
