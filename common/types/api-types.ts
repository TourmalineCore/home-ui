/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Error {
  data?: object | object[] | null;
  error: {
    status?: number;
    name?: string;
    message?: string;
    details?: object;
  };
}

export interface LayoutRequest {
  data: {
    emailAddress: string;
    header: SharedHeaderComponent;
    footer: SharedFooterComponent;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface LayoutListResponse {
  data?: Layout[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Layout {
  id?: number;
  documentId?: string;
  emailAddress: string;
  header: SharedHeaderComponent;
  footer: SharedFooterComponent;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    emailAddress?: string;
    header?: SharedHeaderComponent;
    footer?: SharedFooterComponent;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface LayoutResponse {
  data?: Layout;
  meta?: object;
}

export interface SharedHeaderComponent {
  id?: number;
  buttonLabel?: string;
  emailCaption?: string;
  socialLinks?: {
    id?: number;
    documentId?: string;
  }[];
  navigationLists?: {
    id?: number;
    documentId?: string;
  }[];
}

export interface FooterFooterNavigationListComponent {
  id?: number;
  caption?: string;
  isSocialNetworks?: boolean;
  links?: {
    id?: number;
    documentId?: string;
  }[];
  socialLinks?: {
    id?: number;
    documentId?: string;
  }[];
}

export interface SharedFooterComponent {
  id?: number;
  emailCaption?: string;
  navigationLists?: FooterFooterNavigationListComponent[];
}

export interface NavigationRequest {
  data: {
    name: string;
    link: string;
    navItems?: (number | string)[];
    isMultiLevelNavigation: boolean;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface NavigationListResponse {
  data?: Navigation[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface Navigation {
  id?: number;
  documentId?: string;
  name: string;
  link: string;
  navItems?: {
    id?: number;
    documentId?: string;
    name?: string;
    link?: string;
    navItems?: {
      id?: number;
      documentId?: string;
    }[];
    isMultiLevelNavigation?: boolean;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
      firstname?: string;
      lastname?: string;
      username?: string;
      /** @format email */
      email?: string;
      resetPasswordToken?: string;
      registrationToken?: string;
      isActive?: boolean;
      roles?: {
        id?: number;
        documentId?: string;
        name?: string;
        code?: string;
        description?: string;
        users?: {
          id?: number;
          documentId?: string;
        }[];
        permissions?: {
          id?: number;
          documentId?: string;
          action?: string;
          actionParameters?: any;
          subject?: string;
          properties?: any;
          conditions?: any;
          role?: {
            id?: number;
            documentId?: string;
          };
          /** @format date-time */
          createdAt?: string;
          /** @format date-time */
          updatedAt?: string;
          /** @format date-time */
          publishedAt?: string;
          createdBy?: {
            id?: number;
            documentId?: string;
          };
          updatedBy?: {
            id?: number;
            documentId?: string;
          };
          locale?: string;
          localizations?: {
            id?: number;
            documentId?: string;
          }[];
        }[];
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: number;
          documentId?: string;
        };
        updatedBy?: {
          id?: number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: number;
          documentId?: string;
        }[];
      }[];
      blocked?: boolean;
      preferedLanguage?: string;
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
  isMultiLevelNavigation: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
  }[];
}

export interface NavigationResponse {
  data?: Navigation;
  meta?: object;
}

export interface SocialNetworkRequest {
  data: {
    name: string;
    link: string;
    locale?: string;
    localizations?: (number | string)[];
  };
}

export interface SocialNetworkListResponse {
  data?: SocialNetwork[];
  meta?: {
    pagination?: {
      page?: number;
      /** @min 25 */
      pageSize?: number;
      /** @max 1 */
      pageCount?: number;
      total?: number;
    };
  };
}

export interface SocialNetwork {
  id?: number;
  documentId?: string;
  name: string;
  link: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format date-time */
  publishedAt?: string;
  createdBy?: {
    id?: number;
    documentId?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    /** @format email */
    email?: string;
    resetPasswordToken?: string;
    registrationToken?: string;
    isActive?: boolean;
    roles?: {
      id?: number;
      documentId?: string;
      name?: string;
      code?: string;
      description?: string;
      users?: {
        id?: number;
        documentId?: string;
      }[];
      permissions?: {
        id?: number;
        documentId?: string;
        action?: string;
        actionParameters?: any;
        subject?: string;
        properties?: any;
        conditions?: any;
        role?: {
          id?: number;
          documentId?: string;
        };
        /** @format date-time */
        createdAt?: string;
        /** @format date-time */
        updatedAt?: string;
        /** @format date-time */
        publishedAt?: string;
        createdBy?: {
          id?: number;
          documentId?: string;
        };
        updatedBy?: {
          id?: number;
          documentId?: string;
        };
        locale?: string;
        localizations?: {
          id?: number;
          documentId?: string;
        }[];
      }[];
      /** @format date-time */
      createdAt?: string;
      /** @format date-time */
      updatedAt?: string;
      /** @format date-time */
      publishedAt?: string;
      createdBy?: {
        id?: number;
        documentId?: string;
      };
      updatedBy?: {
        id?: number;
        documentId?: string;
      };
      locale?: string;
      localizations?: {
        id?: number;
        documentId?: string;
      }[];
    }[];
    blocked?: boolean;
    preferedLanguage?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  };
  updatedBy?: {
    id?: number;
    documentId?: string;
  };
  locale?: string;
  localizations?: {
    id?: number;
    documentId?: string;
    name?: string;
    link?: string;
    /** @format date-time */
    createdAt?: string;
    /** @format date-time */
    updatedAt?: string;
    /** @format date-time */
    publishedAt?: string;
    createdBy?: {
      id?: number;
      documentId?: string;
    };
    updatedBy?: {
      id?: number;
      documentId?: string;
    };
    locale?: string;
    localizations?: {
      id?: number;
      documentId?: string;
    }[];
  }[];
}

export interface SocialNetworkResponse {
  data?: SocialNetwork;
  meta?: object;
}
