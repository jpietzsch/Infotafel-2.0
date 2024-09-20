import type { Struct, Schema } from '@strapi/strapi';

export interface StundenplanVertretungsplan extends Struct.ComponentSchema {
  collectionName: 'components_stundenplan_vertretungsplans';
  info: {
    displayName: 'Vertretungsplan';
    icon: 'apps';
    description: '';
  };
  attributes: {
    Stunde: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
          max: 10;
        },
        number
      >;
    Text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'stundenplan.vertretungsplan': StundenplanVertretungsplan;
    }
  }
}
