export const themeConfig = {
    light: {
      background: 'bg-gray-50',
      text: 'text-gray-900',
      border: 'border-gray-200',
      primary: {
        DEFAULT: 'bg-primary',
        hover: 'hover:bg-primary-darker',
        text: 'text-white',
      },
      card: {
        background: 'bg-white',
        hover: 'hover:bg-gray-50',
      },
      stats: {
        purple: 'bg-purple-50 text-purple-700',
        orange: 'bg-orange-50 text-orange-700',
        green: 'bg-green-50 text-green-700',
        blue: 'bg-blue-50 text-blue-700',
      }
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      border: 'border-gray-700',
      primary: {
        DEFAULT: 'bg-primary-dark',
        hover: 'hover:bg-primary-darker',
        text: 'text-white',
      },
      card: {
        background: 'bg-gray-800',
        hover: 'hover:bg-gray-700',
      },
      stats: {
        purple: 'bg-purple-900/50 text-purple-200',
        orange: 'bg-orange-900/50 text-orange-200',
        green: 'bg-green-900/50 text-green-200',
        blue: 'bg-blue-900/50 text-blue-200',
      }
    }
  }