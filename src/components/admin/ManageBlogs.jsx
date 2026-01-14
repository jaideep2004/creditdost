import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton as MuiIconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { adminAPI } from '../../services/api';
import { getImagePreviewUrl } from '../../utils/googleDriveUtils';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filters, setFilters] = useState({ status: '', search: '', category: '' });
  const [categories, setCategories] = useState([]); // To store all unique categories
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    tags: '',
    categories: '',
    featuredImage: ''
  });
  
  // State for image upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllBlogs(filters);
      setBlogs(response.data.blogs);
      
      // Extract unique categories from all blogs
      const allCategories = [];
      response.data.blogs.forEach(blog => {
        if (blog.categories) {
          blog.categories.forEach(category => {
            if (!allCategories.includes(category)) {
              allCategories.push(category);
            }
          });
        }
      });
      setCategories(allCategories);
    } catch (error) {
      showSnackbar('Error fetching blogs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDialog = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      const featuredImageUrl = blog.featuredImage || '';
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || '',
        status: blog.status,
        tags: blog.tags ? blog.tags.join(', ') : '',
        categories: blog.categories ? blog.categories.join(', ') : '',
        featuredImage: featuredImageUrl
      });
      
      // Set image preview for existing image
      setImagePreview(featuredImageUrl);
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft',
        tags: '',
        categories: '',
        featuredImage: ''
      });
      setSelectedImage(null);
      setImagePreview('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBlog(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showSnackbar('Please select a valid image file (JPEG, PNG, JPG)', 'error');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('File size exceeds 5MB limit', 'error');
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, featuredImage: reader.result }); // Temporarily set preview URL
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Upload image to server
  const uploadImage = async () => {
    if (!selectedImage) return null;
    
    const formData = new FormData();
    formData.append('image', selectedImage);
    
    try {
      const response = await adminAPI.uploadBlogImage(formData);
      return response.data.imageUrl; // Return the actual server URL
    } catch (error) {
      showSnackbar('Error uploading image: ' + (error.response?.data?.message || error.message), 'error');
      return null;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      showSnackbar('Title is required', 'error');
      return;
    }
    
    if (!formData.content.trim()) {
      showSnackbar('Content is required', 'error');
      return;
    }
    
    try {
      let imageUrl = formData.featuredImage;
      
      // Upload image if a new one was selected
      if (selectedImage) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          return; // Error already shown
        }
      }
      
      const blogData = {
        ...formData,
        featuredImage: imageUrl, // Use the uploaded image URL
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        categories: formData.categories.split(',').map(category => category.trim()).filter(category => category)
      };
      
      if (editingBlog) {
        // Update existing blog
        await adminAPI.updateBlog(editingBlog._id, blogData);
        showSnackbar('Blog updated successfully');
      } else {
        // Create new blog
        await adminAPI.createBlog(blogData);
        showSnackbar('Blog created successfully');
      }
      
      handleCloseDialog();
      fetchBlogs();
    } catch (error) {
      showSnackbar('Error saving blog: ' + (error.response?.data?.message || error.message), 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await adminAPI.deleteBlog(id);
        showSnackbar('Blog deleted successfully');
        fetchBlogs();
      } catch (error) {
        showSnackbar('Error deleting blog', 'error');
      }
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} style={{ flexDirection: 'column' }}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Manage Blogs</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add New Blog
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                <TextField
                  label="Search Blogs"
                  variant="outlined"
                  size="small"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  sx={{ minWidth: 200 }}
                />
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status}
                    label="Status"
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filters.category}
                    label="Category"
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button 
                  variant="outlined" 
                  onClick={fetchBlogs}
                  size="small"
                >
                  Refresh
                </Button>
              </Box>

              {loading ? (
                <Box display="flex" justifyContent="center" my={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell align="center">Views</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {blogs.map((blog) => (
                        <TableRow key={blog._id} hover>
                          <TableCell>
                            <Typography variant="subtitle2">{blog.title}</Typography>
                            <Typography variant="body2" color="textSecondary" noWrap sx={{ maxWidth: 300 }}>
                              {blog.excerpt}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {blog.author?.name || 'Unknown'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={blog.status} 
                              color={getStatusColor(blog.status)} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>
                            {blog.categories && blog.categories.slice(0, 3).map((category, index) => (
                              <Chip 
                                key={index} 
                                label={category} 
                                size="small" 
                                variant="outlined" 
                                sx={{ mr: 0.5, mb: 0.5 }} 
                                color="primary"
                              />
                            ))}
                            {blog.categories && blog.categories.length > 3 && (
                              <Chip 
                                label={`+${blog.categories.length - 3}`} 
                                size="small" 
                                variant="outlined" 
                                sx={{ mr: 0.5, mb: 0.5 }} 
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {blog.tags && blog.tags.slice(0, 3).map((tag, index) => (
                              <Chip 
                                key={index} 
                                label={tag} 
                                size="small" 
                                variant="outlined" 
                                sx={{ mr: 0.5, mb: 0.5 }} 
                              />
                            ))}
                            {blog.tags && blog.tags.length > 3 && (
                              <Chip 
                                label={`+${blog.tags.length - 3}`} 
                                size="small" 
                                variant="outlined" 
                                sx={{ mr: 0.5, mb: 0.5 }} 
                              />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2">
                              {blog.views || 0}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Edit">
                              <IconButton 
                                size="small" 
                                onClick={() => handleOpenDialog(blog)}
                                color="primary"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton 
                                size="small" 
                                onClick={() => handleDelete(blog._id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Blog Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBlog ? 'Edit Blog' : 'Create New Blog'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3} style={{ flexDirection: 'column' }}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  helperText="A short summary of your blog post"
                />
              </Grid>
              
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="featured-image-upload"
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />
                <label htmlFor="featured-image-upload">
                  <Button 
                    variant="outlined" 
                    component="span" 
                    fullWidth
                    startIcon={<AddIcon />}
                  >
                    {imagePreview ? 'Change Featured Image' : 'Upload Featured Image'}
                  </Button>
                </label>
                
                {imagePreview && (
                  <Box mt={2} textAlign="center">
                    <Typography variant="caption" display="block" gutterBottom>
                      Image Preview:
                    </Typography>
                    <img 
                      src={imagePreview} 
                      alt="Featured preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', border: '1px solid #ddd' }} 
                      onError={(e) => { 
                        console.error('Image preview failed to load:', imagePreview);
                        showSnackbar('Error loading image preview.', 'error');
                      }}
                    />
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  multiline
                  rows={15}
                  required
                  variant="outlined"
                  helperText={`Write your blog content here (${formData.content.length} characters)`}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags (comma separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  variant="outlined"
                  helperText="Enter tags separated by commas (e.g., technology, programming, web)"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Categories (comma separated)"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  variant="outlined"
                  helperText="Enter categories separated by commas (e.g., Technology, Business, Finance)"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={!formData.title.trim() || !formData.content.trim()}
            sx={{ minWidth: 100 }}
          >
            {editingBlog ? 'Update Blog' : 'Create Blog'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageBlogs;