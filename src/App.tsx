import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { KnowledgeDetailPage } from './pages/KnowledgeDetailPage'
import { KnowledgePage } from './pages/KnowledgePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { TemplateDetailPage } from './pages/TemplateDetailPage'
import { TemplatesPage } from './pages/TemplatesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/knowledge" element={<KnowledgePage />} />
      <Route path="/knowledge/:id" element={<KnowledgeDetailPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/templates/:id" element={<TemplateDetailPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
    </Routes>
  )
}

export default App
