import type { Block } from 'payload'
import { backgroundColor } from '@/fields/backgroundColor'

export const ActionCardsBlock: Block = {
  slug: 'actionCards',
  labels: {
    singular: 'Action Cards Block',
    plural: 'Action Cards Blocks',
  },
  fields: [
    backgroundColor,
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Heart',
              value: 'heart',
            },
            {
              label: 'Users',
              value: 'users',
            },
            {
              label: 'Book',
              value: 'book',
            },
            {
              label: 'Help',
              value: 'help',
            },
          ],
        },
        {
          name: 'color',
          type: 'select',
          required: true,
          defaultValue: 'red',
          options: [
            {
              label: 'Red',
              value: 'red',
            },
            {
              label: 'Amber',
              value: 'amber',
            },
            {
              label: 'Emerald',
              value: 'emerald',
            },
            {
              label: 'Blue',
              value: 'blue',
            },
          ],
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

