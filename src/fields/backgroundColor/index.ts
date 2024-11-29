import type { Field } from 'payload'

export const backgroundColor: Field = {
  type: 'select',
  name: 'backgroundColor',
  label: 'Background Color',
  required: true,
  defaultValue: 'white',
  options: [
    {
      label: 'White',
      value: 'white',
    },
    {
      label: 'Light Gray',
      value: 'gray',
    },
    {
      label: 'Light Blue',
      value: 'blue',
    },
    {
      label: 'Light Green',
      value: 'green',
    },
  ],
  admin: {
    description: 'Choose the background color for this section',
    position: 'sidebar',
  },
}

