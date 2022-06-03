import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { aboutPost } from '../interfaces/posts'
import React from 'react'

const postsDirectory = path.join(process.cwd(), 'content/sensiblog')

/**
 * Reads files in 'about' folder and returns array of posts
 * @param collectionName 
 * @returns 
 */

export const getAbout = async (collectionName: string): Promise<aboutPost[]> => {
  // Get file names under /posts
  const mydir = path.join(process.cwd(), 'content/' + collectionName)
  const fileNames = fs.readdirSync(mydir)

  const parseContent = async (fileName: string) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(mydir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // front matter contains english content
    const matterResult = matter(fileContents)
    // main content is in spanish
    const contentSpanish = matterResult.content

    return {
      id,
      contentSpanish,
      contentEnglish: matterResult.data.body_eng!,
      date: matterResult.data.date!,
      title: matterResult.data.title!,
    }
  }

  const processFileNames = async () => {
    return await Promise.all(fileNames.map(parseContent))
  }
  // console.log("processFileNames()", await processFileNames());
  return processFileNames()
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

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  // console.log("matterResult", matterResult);
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  // console.log("processed spanish content", processedContent);

  const processedContent2 = await remark()
    .use(html)
    .process(matterResult.data.body_eng)
  // console.log("processed english content", processedContent2);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}