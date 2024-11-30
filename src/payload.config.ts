import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Programs } from './collections/Programs'
import { Events } from './collections/Events'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from './fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Add admin groups to collections
const enhanceCollection = (collection: any, group: string) => ({
  ...collection,
  admin: {
    ...collection.admin,
    group,
  },
})

export default buildConfig({
  admin: {
    components: {
      // Replace default dashboard
      views: {
        Dashboard: {
          path: 'components/Dashboard',
          Component: 'components/Dashboard',
        }
      },
      // Custom navigation
      Nav: {
        path: 'components/Navigation',
      },
      // Custom header actions
      actions: [
        {
          path: 'components/Header/Actions',
        }
      ],
      // Custom branding
      graphics: {
        Icon: {
          path: 'components/Graphics/Icon',
        },
        Logo: {
          path: 'components/Graphics/Logo',
        },
      },
    },
    meta: {
      titleSuffix: '- Marketing Backend',
    },
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    enhanceCollection(Pages, 'Content Management'),
    enhanceCollection(Posts, 'Content Management'),
    enhanceCollection(Programs, 'Programs & Events'),
    enhanceCollection(Events, 'Programs & Events'),
    enhanceCollection(Media, 'Assets'),
    enhanceCollection(Categories, 'Configuration'),
    Users,
  ],
  globals: [
    {
      ...Header,
      admin: {
        ...Header.admin,
        group: 'Configuration',
      }
    },
    {
      ...Footer,
      admin: {
        ...Footer.admin,
        group: 'Configuration',
      }
    }
  ],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
