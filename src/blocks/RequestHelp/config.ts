import type { Block } from 'payload'
import { backgroundColor } from '../../fields/backgroundColor'

export const RequestHelpBlock: Block = {
  slug: 'requestHelp',
  labels: {
    singular: 'Request Help Block',
    plural: 'Request Help Blocks',
  },
  fields: [
    backgroundColor,
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
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
          required: true,
        },
        {
          name: 'style',
          type: 'group',
          label: 'Image Style',
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
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Get In Touch',
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
