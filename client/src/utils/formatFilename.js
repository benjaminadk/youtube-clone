export const formatFilename = (filename, folder) => {
  const d = new Date()
  const date = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`
  const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, '-')
  return `${folder}/${date}-${cleanFilename}`
}
