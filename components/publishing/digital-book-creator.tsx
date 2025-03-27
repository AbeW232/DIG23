"use client"

import { useState } from "react"

interface DigitalBookCreatorProps {
  initialContent?: BookContent
  onSave?: (content: BookContent) => void
  onExport?: (format: string) => void
  className?: string
}

interface BookContent {
  title: string
  author: string
  coverImage?: string
  description: string
  chapters: Chapter[]
  metadata: {
    isbn?: string
    language: string
    category: string
    tags: string[]
    tableOfContents: boolean
    pageNumbers: boolean
  }
}

interface Chapter {
  id: string
  title: string
  content: string
  sections: Section[]
}

interface Section {
  id: string
  title: string
  content: string
}

export function DigitalBookCreator({ initialContent, onSave, onExport, className }: DigitalBookCreatorProps) {
  const [activeTab, setActiveTab] = useState("content");
  const [bookContent, setBookContent] = useState<BookContent>(initialContent || {
    title: "",
    author: "",
    description: "",
    chapters: [
      {
        id: "chapter-1",
        title: "Chapter 1",
        content: "",
        sections: []
      }
    ],
    metadata: {
      language: "en",
      category: "memoir",
      tags: [],
      tableOfContents: true,
      pageNumbers: true
    }
  });
  
  const [expandedChapters, setExpandedChapters] = useState<string[]>(["chapter-1"]);
  const [activeChapter, setActiveChapter] = useState<string>("chapter-1");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"book" | "page">("book");

  const toggleChapterExpand = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const addChapter = () => {
    const newChapterId = `chapter-${Date.now()}`;
    setBookContent(prev => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        {
          id: newChapterId,
          title: `Chapter ${prev.chapters.length + 1}`,
          content: "",
          sections: []
        }
      ]
    }));
    setExpandedChapters(prev => [...prev, newChapterId]);
    setActiveChapter(newChapterId);
  };

  const addSection = (chapterId: string) => {
    const newSectionId = `section-${Date.now()}`;
    setBookContent(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => 
        chapter.id === chapterId 
          ? {
              ...chapter,
              sections: [
                ...chapter.sections,
                {
                  id: newSectionId,
                  title: `Section ${chapter.sections.length + 1}`,
                  content: ""
                }
              ]
            }
          : chapter
      )
    }));
    setActiveSection(newSectionId);
  };

  const removeChapter = (chapterId: string) => {
    setBookContent(prev => ({
      ...prev,
      chapters: prev.chapters.filter(chapter => chapter.id !== chapterId)
    }));
    
    if (activeChapter === chapterId) {
      setActiveChapter(bookContent.chapters[0]?.id || "");
      setActiveSection(null);
    }
  };

  const removeSection = (chapterId: string, sectionId: string) => {
    setBookContent(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => 
        chapter.id === chapterId 
          ? {
              ...chapter,
              sections: chapter.sections.filter(section => section.id !== sectionId)
            }
          : chapter
      )
    }));
    
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };

  const updateChapterTitle = (chapterId: string, title: string) => {
    setBookContent(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => 
        chapter.id === chapterId 
          ? { ...chapter, title }
          : chapter
      )
    }));
  };

  const updateChapterContent = (chapterId: string, content: string) => {
    setBookContent(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => 
        chapter.id === chapterId 
          ? { ...chapter, content }
          : chapter
      )
    }));
  };

  const updateSectionTitle = (chapterId: string, sectionId: string, title: string) => {
    setBookContent(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => 
        chapter.id === chapterId 
          ? {
              ...chapter,
              sections: chapter.sections.map(section => 
                section.id === sectionId 
                  ? { ...section, title }
                  : section
              )
            }
          : chapter
      )
    }));
  };

  const updateSectionContent = (chapterId: string, sectionId: string, content: string) => {
    setBookContent(prev => ({
      ...prev,
      chapters: prev.chapters.map(chapter => 
        chapter.id === chapterId 
          ? {
              ...chapter,
              sections: chapter.sections.map(section => 
                section.id === sectionId 
                  ? { ...section, content }
                  : section
              )
            }
          : chapter
      )
    }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination, type } = result;
    
    if (type === "chapter") {
      const chapters = Array.from(bookContent.chapters);
      const [removed] = chapters.splice(source.index, 1);
      chapters.splice(destination.index, 0, removed);
      
      setBookContent(prev => ({
        ...prev,
        chapters
      }));
    } else if (type === "section") {
      const chapterId = source.droppableId.replace("sections-", "");
      const chapter = bookContent.chapters.find(c => c.id === chapterId);
      
      if (chapter) {
        const sections = Array.from(chapter.sections);
        const [removed] = sections.splice(source.index, 1);
        sections.splice(destination.index, 0, removed);
        
        setBookContent(prev => ({
          ...prev,
          chapters: prev.chapters.map(c => 
            c.id === chapterId 
              ? { ...c, sections }
              : c
          )
        }));
      }
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(bookContent);
    }
  };

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format);
    }
  };

  const getActiveChapterContent = () => {
    const chapter = bookContent.chapters.find(c => c.id === activeChapter);
    return chapter || null;
  };

  const getActiveSectionContent = () => {
    const chapter = bookContent.chapters.find(c => c.id === activeChapter);
    if (!chapter || !activeSection) return null;
    
    return chapter.sections.find(
\

