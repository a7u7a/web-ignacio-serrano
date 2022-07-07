import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { aboutPost, feedPost, sensiblogPost, modalContent } from '../interfaces/posts'

const postsDirectory = path.join(process.cwd(), 'content/sensiblog')
const feedDirectory = path.join(process.cwd(), 'content/feed')
const sensiblogDirectory = path.join(process.cwd(), 'content/sensiblog')
const modalsDirectory = path.join(process.cwd(), 'content/modals')
/**
 * Reads files in 'about' folder and returns array of posts
 * Written like this because it used to do remark parsing which used await keyword
 * Keeping this as reference
 * 
 * I should be using the interfaces to unpack matterResult
 */
export const getAbout = async (): Promise<aboutPost[]> => {
  // Get file names under /posts
  const mydir = path.join(process.cwd(), 'content/about')
  const fileNames = fs.readdirSync(mydir)

  const parseContent = async (fileName: string) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(mydir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // front matter contains english content
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    //   const processedContent = await remark()
    //   .use(html)
    //   .process(matterResult.content)
    // const contentHtml = processedContent.toString()
    // main content is in spanish
    const contentSpanish = matterResult.content

    return {
      id,
      contentSpanish,
      contentEnglish: matterResult.data.body_eng,
      date: matterResult.data.date!,
      title: matterResult.data.title!,
    }
  }

  const processFileNames = async () => {
    return await Promise.all(fileNames.map(parseContent))
  }
  return processFileNames()
}

function sortFeedPosts(allPostsData: feedPost[]) {
  return allPostsData.sort((a, b) => Number(Date.parse(b.date)) - Number(Date.parse(a.date)))
}

function sortSensiblogPosts(allPostsData: sensiblogPost[]) {
  return allPostsData.sort((a, b) => Number(Date.parse(a.date)) - Number(Date.parse(b.date)))
}

export const getSortedFeedPosts = (): feedPost[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(feedDirectory)
  const allPostsData: feedPost[] = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(feedDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const contentSpanish = matterResult.content

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      thumbnail: matterResult.data.thumbnail,
      contentSpanish,
      tags: matterResult.data.tags
    }
  })
  return sortFeedPosts(allPostsData)
}

export const getSortedSensiblogPosts = (): sensiblogPost[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(sensiblogDirectory)
  const allPostsData: sensiblogPost[] = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(sensiblogDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const contentSpanish = matterResult.content

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      thumbnail: matterResult.data.thumbnail,
      contentSpanish,
      tags: matterResult.data.tags,
      title_eng: matterResult.data.title_eng,
      contentEnglish: matterResult.data.body_eng,
      category: matterResult.data.category
    }
  })
  return sortSensiblogPosts(allPostsData)
}

/**
 * Finds posts whose tags intersect with intput tags
 * Returns 
 */

export const getRelatedSensiblogPosts = (targetTags: string[]): sensiblogPost[] => {
  const allPosts = getSortedSensiblogPosts()
  const xPosts: sensiblogPost[] = []
  allPosts.map(post => {
    // find intersecting tags for current post, if any
    const currentTags = post.tags
    const xTags = currentTags.filter(tag => targetTags.includes(tag))
    // console.log("targetTags", targetTags, "currentTags", currentTags, "xTags", xTags);
    if (xTags.length > 0) {
      xPosts.push(post)
    }
  })
  // console.log("intersectingPosts", intersectingPosts);
  return xPosts
}

export const getSensiblogPost = (id: string): sensiblogPost => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const contentSpanish = matterResult.content
  const _ = matter(matterResult.data.body_eng)
  const contentEnglishOut = _.content.split('\n').join("\r\n")

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    thumbnail: matterResult.data.thumbnail,
    contentSpanish,
    tags: matterResult.data.tags,
    title_eng: matterResult.data.title_eng,
    contentEnglish: contentEnglishOut,
    category: matterResult.data.category
  }
}

// Used to render post index
export const getSortedPostsData = () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string, title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export const getModalContents = (id: string): modalContent => {
  const fullPath = path.join(modalsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  return {
    id,
    contentSpanish: matterResult.content,
    contentEnglish: matterResult.data.body_eng,
    ...(matterResult.data as { date: string; title: string })
  }
}

