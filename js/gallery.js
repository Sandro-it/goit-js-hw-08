const galleryContainer = document.querySelector(".gallery");

function createGalleryItem({ preview, original, description }) {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery-item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery-link");
  galleryLink.href = original;

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery-image");
  galleryImage.src = preview;
  galleryImage.setAttribute("data-source", original);
  galleryImage.alt = description;

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
}

images.forEach((image) => {
  const galleryItem = createGalleryItem(image);
  galleryContainer.appendChild(galleryItem);
});

galleryContainer.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== "IMG") return;

  const largeImageURL = target.dataset.source;

  openModal(largeImageURL);
}

function openModal(imageURL) {
  const instance = basicLightbox.create(
    `<img src="${imageURL}" width="800" height="600">`
  );
  instance.show();

  document.addEventListener("keydown", onKeyPress);

  function onKeyPress(event) {
    if (event.key === "Escape") {
      instance.close();
      document.removeEventListener("keydown", onKeyPress);
    }
  }
}
