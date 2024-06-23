#!/bin/bash

# Fetch all tags
git fetch --tags

# Get the latest tag
latest_tag=$(git describe --tags `git rev-list --tags --max-count=1`)

# If no tags are found, set the first tag
if [ -z "$latest_tag" ]; then
  new_tag="0.1.0"
else
  # Increment the version (assuming semantic versioning)
  IFS='.' read -r -a version_parts <<< "$latest_tag"
  major=${version_parts[0]}
  minor=${version_parts[1]}
  patch=${version_parts[2]}

  # Increase the patch number
  new_patch=$((patch + 1))

  # Create new tag
  new_tag="$major.$minor.$new_patch"
fi

git tag $new_tag
git push origin $new_tag
echo "Created new tag: $new_tag"
