import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

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

// Define valid group names as a type
type GroupName = 'Menu' | 'Collections' | 'Content Management' | 'Programs & Events' | 'Assets' | 'Configuration'

// Type-safe group enhancement
const enhanceCollection = (collection: CollectionConfig, group: GroupName): CollectionConfig => ({
  ...collection,
  admin: {
    ...collection.admin,
    group,
  },
})

export default buildConfig({
  serverURL: getServerSideURL(),
  admin: {
    user: Users.slug,
    components: {
      // Theme provider
      providers: [{
        path: 'src/providers',
        exportName: 'Component'
      }],
      // Navigation components
      Nav: {
        path: 'src/components/admin/collapsibleNav',
      },
      afterNavLinks: [{
        path: 'src/components/admin/AfterNavLinks',
      }],
      // Custom header
      header: [{
        path: 'src/components/admin/Header',
      }],
      // Graphics
      graphics: {
        Icon: {
          path: 'src/components/admin/Graphics/Icon',
        },
        Logo: {
          path: 'src/components/admin/Graphics/Icon',
        },
      },
      
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel
      beforeLogin: ['src/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel
      beforeDashboard: ['src/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Angels and Dragonflies CMS',
    },
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
    // Content Management group
    enhanceCollection(Pages, 'Content Management'),
    enhanceCollection(Posts, 'Content Management'),

    // Programs & Events group
    enhanceCollection(Programs, 'Programs & Events'),
    enhanceCollection(Events, 'Programs & Events'),

    // Assets group
    enhanceCollection(Media, 'Assets'),

    // Configuration group
    enhanceCollection(Categories, 'Configuration'),
    {
      ...Users,
      admin: {
        ...Users.admin,
        group: 'Configuration' as GroupName,
      },
    },
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
});
