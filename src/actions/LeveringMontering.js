export const carouselSelect = (selectedIndex, e) => {
  return {
    type: '@@leveringMontering/CAROUSEL_SELECT',
    selectedIndex: selectedIndex,
    direction: e.direction
  }
}
