import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'bg',
      type: 'group',
      label: 'Background',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
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
              name: 'fit',
              type: 'select',
              label: 'Image Fit',
              defaultValue: 'cover',
              options: [
                { label: 'Cover', value: 'cover' },
                { label: 'Contain', value: 'contain' },
                { label: 'Auto', value: 'auto' },
              ],
            },
            {
              name: 'pos',
              type: 'select',
              label: 'Position',
              defaultValue: 'center',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'bottom' },
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
              defaultValue: true,
            },
            {
              name: 'opacity',
              type: 'number',
              label: 'Overlay Opacity',
              min: 0,
              max: 100,
              defaultValue: 40,
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
      name: 'scroll',
      type: 'group',
      label: 'Scroll Indicator',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Show Scroll Indicator',
          defaultValue: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Scroll Text',
          defaultValue: 'Scroll Down',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.enable),
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Scroll Icon',
          defaultValue: 'chevron-down',
          options: [
            { label: 'Chevron Down', value: 'chevron-down' },
            { label: 'Arrow Down', value: 'arrow-down' },
            { label: 'Mouse', value: 'mouse' },
            { label: 'Circle Arrow', value: 'circle-arrow' },
          ],
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.enable),
          },
        },
        {
          name: 'animation',
          type: 'select',
          label: 'Animation Style',
          defaultValue: 'bounce',
          options: [
            { label: 'Bounce', value: 'bounce' },
            { label: 'Pulse', value: 'pulse' },
            { label: 'Fade', value: 'fade' },
            { label: 'None', value: 'none' },
          ],
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.enable),
          },
        },
        {
          name: 'position',
          type: 'group',
          label: 'Position Adjustment',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.enable),
          },
          fields: [
            {
              name: 'bottom',
              type: 'text',
              label: 'Bottom Spacing',
              defaultValue: '2rem',
            },
            {
              name: 'color',
              type: 'text',
              label: 'Color',
              defaultValue: 'white',
            },
          ],
        },
      ],
    },
  ],
  label: false,
}
