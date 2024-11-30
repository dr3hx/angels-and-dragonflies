import type { Block } from 'payload'
import { backgroundColor } from '../../fields/backgroundColor'

export const ProgramsGridBlock: Block = {
  slug: 'programsGrid',
  labels: {
    singular: 'Programs Grid Block',
    plural: 'Programs Grid Blocks',
  },
  fields: [
    backgroundColor,
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Programs',
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
      name: 'programsToShow',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      admin: {
        description: 'Select specific programs to display. If none selected, will show all published programs.',
      },
    },
    {
      name: 'layout',
      type: 'group',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'grid',
          options: [
            {
              label: 'Grid',
              value: 'grid',
            },
            {
              label: 'Featured',
              value: 'featured',
            },
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
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'View All Programs',
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
