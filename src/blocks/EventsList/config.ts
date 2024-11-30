import type { Block } from 'payload'
import { backgroundColor } from '../../fields/backgroundColor'

export const EventsListBlock: Block = {
  slug: 'eventsList',
  labels: {
    singular: 'Events List Block',
    plural: 'Events List Blocks',
  },
  fields: [
    backgroundColor,
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'bg',
      type: 'group',
      label: 'Background',
      fields: [
        {
          name: 'img',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
        {
          name: 'style',
          type: 'group',
          label: 'Image Style',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.img),
          },
          fields: [
            {
              name: 'size',
              type: 'group',
              label: 'Size Controls',
              fields: [
                {
                  name: 'mode',
                  type: 'select',
                  label: 'Size Mode',
                  defaultValue: 'cover',
                  options: [
                    { label: 'Cover', value: 'cover' },
                    { label: 'Contain', value: 'contain' },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
                {
                  name: 'width',
                  type: 'text',
                  label: 'Width',
                  admin: {
                    condition: (_, { mode } = {}) => mode === 'custom',
                    description: 'E.g., 100%, 500px, auto',
                  },
                },
                {
                  name: 'height',
                  type: 'text',
                  label: 'Height',
                  admin: {
                    condition: (_, { mode } = {}) => mode === 'custom',
                    description: 'E.g., 100%, 500px, auto',
                  },
                },
              ],
            },
            {
              name: 'position',
              type: 'group',
              label: 'Position',
              fields: [
                {
                  name: 'x',
                  type: 'select',
                  label: 'Horizontal Position',
                  defaultValue: 'center',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                  ],
                },
                {
                  name: 'y',
                  type: 'select',
                  label: 'Vertical Position',
                  defaultValue: 'center',
                  options: [
                    { label: 'Top', value: 'top' },
                    { label: 'Center', value: 'center' },
                    { label: 'Bottom', value: 'bottom' },
                  ],
                },
                {
                  name: 'customX',
                  type: 'text',
                  label: 'Custom X Position',
                  admin: {
                    description: 'E.g., 20px, 50%, -10px',
                  },
                },
                {
                  name: 'customY',
                  type: 'text',
                  label: 'Custom Y Position',
                  admin: {
                    description: 'E.g., 20px, 50%, -10px',
                  },
                },
              ],
            },
            {
              name: 'repeat',
              type: 'select',
              label: 'Repeat',
              defaultValue: 'no-repeat',
              options: [
                { label: 'No Repeat', value: 'no-repeat' },
                { label: 'Repeat', value: 'repeat' },
                { label: 'Repeat X', value: 'repeat-x' },
                { label: 'Repeat Y', value: 'repeat-y' },
              ],
            },
            {
              name: 'fixed',
              type: 'checkbox',
              label: 'Fixed Background',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'overlay',
          type: 'group',
          label: 'Overlay Settings',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.img),
          },
          fields: [
            {
              name: 'enable',
              type: 'checkbox',
              label: 'Enable Overlay',
              defaultValue: false,
            },
            {
              name: 'opacity',
              type: 'number',
              label: 'Overlay Opacity',
              min: 0,
              max: 100,
              defaultValue: 50,
              admin: {
                step: 5,
                condition: (data, siblingData) => Boolean(siblingData?.enable),
              },
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'group',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'list',
          options: [
            { label: 'List', value: 'list' },
            { label: 'Grid', value: 'grid' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          admin: {
            condition: (_, { style } = {}) => style === 'grid',
          },
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
      ],
    },
    {
      name: 'showFeaturedEventFirst',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show a featured event in a larger card at the top',
      },
    },
    {
      name: 'eventsToShow',
      type: 'number',
      min: 1,
      max: 10,
      defaultValue: 3,
      admin: {
        description: 'Number of events to display',
      },
    },
    {
      name: 'eventDisplay',
      type: 'group',
      fields: [
        {
          name: 'showDate',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Event Date',
        },
        {
          name: 'showTime',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Event Time',
        },
        {
          name: 'showLocation',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Event Location',
        },
        {
          name: 'showDescription',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Event Description',
        },
        {
          name: 'showImage',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Event Image',
        },
      ],
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'View All Events',
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'page',
              options: [
                {
                  label: 'Page',
                  value: 'page',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_, { type } = {}) => type === 'page',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, { type } = {}) => type === 'custom',
              },
            },
          ],
        },
      ],
    },
  ],
}
