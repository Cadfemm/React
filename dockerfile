# Nodejs
FROM base-image-react

# Working directory
WORKDIR /React

# Copy current directory
COPY . .

# Expose port
EXPOSE 3000

# Run application
CMD ["npm", "start"]