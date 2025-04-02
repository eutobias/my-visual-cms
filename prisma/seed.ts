import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample pages
  const homePage = await prisma.page.create({
    data: {
      name: 'Home',
      slug: 'home',
      displayName: 'Home Page',
      showInMenu: true,
      enabled: true,
    },
  });

  const aboutPage = await prisma.page.create({
    data: {
      name: 'About',
      slug: 'about',
      displayName: 'About Us',
      showInMenu: true,
      enabled: true,
    },
  });

  const contactPage = await prisma.page.create({
    data: {
      name: 'Contact',
      slug: 'contact',
      displayName: 'Contact Us',
      showInMenu: true,
      enabled: true,
    },
  });

  const blogPage = await prisma.page.create({
    data: {
      name: 'Blog',
      slug: 'blog',
      displayName: 'Our Blog',
      showInMenu: true,
      enabled: true,
    },
  });

  const draftPage = await prisma.page.create({
    data: {
      name: 'Coming Soon',
      slug: 'coming-soon',
      displayName: 'Coming Soon',
      showInMenu: false,
      enabled: false,
    },
  });

  // Create shared blocks
  const headerBlock = await prisma.block.create({
    data: {
      name: 'Header',
      content: JSON.stringify({
        type: 'header',
        title: 'Welcome to Visual CMS',
        subtitle: 'A modern content management system',
      }),
      shared: true,
      pages: {
        connect: [{ id: homePage.id }, { id: aboutPage.id }, { id: contactPage.id }, { id: blogPage.id }],
      },
    },
  });

  const footerBlock = await prisma.block.create({
    data: {
      name: 'Footer',
      content: JSON.stringify({
        type: 'footer',
        copyright: '© 2024 Visual CMS. All rights reserved.',
        links: ['Privacy Policy', 'Terms of Service'],
      }),
      shared: true,
      pages: {
        connect: [{ id: homePage.id }, { id: aboutPage.id }, { id: contactPage.id }, { id: blogPage.id }],
      },
    },
  });

  // Create page-specific blocks
  await prisma.block.create({
    data: {
      name: 'Home Hero',
      content: JSON.stringify({
        type: 'hero',
        title: 'Build Beautiful Websites',
        description: 'Create stunning web pages with our visual CMS',
        ctaText: 'Get Started',
      }),
      shared: false,
      pages: {
        connect: [{ id: homePage.id }],
      },
    },
  });

  await prisma.block.create({
    data: {
      name: 'About Content',
      content: JSON.stringify({
        type: 'text',
        title: 'Our Story',
        paragraphs: [
          'We are passionate about creating tools that make web development easier.',
          'Our team consists of dedicated developers and designers.',
        ],
      }),
      shared: false,
      pages: {
        connect: [{ id: aboutPage.id }],
      },
    },
  });

  await prisma.block.create({
    data: {
      name: 'Contact Form',
      content: JSON.stringify({
        type: 'form',
        fields: [
          { type: 'text', label: 'Name', required: true },
          { type: 'email', label: 'Email', required: true },
          { type: 'textarea', label: 'Message', required: true },
        ],
        submitButton: 'Send Message',
      }),
      shared: false,
      pages: {
        connect: [{ id: contactPage.id }],
      },
    },
  });

  await prisma.block.create({
    data: {
      name: 'Blog List',
      content: JSON.stringify({
        type: 'blog-list',
        title: 'Latest Posts',
        postsPerPage: 10,
        showExcerpt: true,
      }),
      shared: false,
      pages: {
        connect: [{ id: blogPage.id }],
      },
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });