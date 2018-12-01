$( document ).ready(function() {
    const body = $("body"),
          cards = body.find(".card"),
          carousel = body.find("#card-carousel"),
          carouselInner = body.find(".carousel-inner"),
          carouselNext = body.find(".carousel-control-next"),
          carouselPrev = body.find(".carousel-control-prev");

    function onCardClick(event) {
      const target = $(event.currentTarget);
      target.toggleClass("flipped");
    }

    function flipCard(card) {
      if (!card.hasClass("flipped")) {
        card.addClass("flipped");
      }
    }

    function initDraggable() {
      const droppables = body.find(".item-img");
      const dropContainer = body.find("#game-save");
      const dropTarget = body.find("#panda-drop-target");

      //the overlapThreshold can be a percentage ("50%", for example, would only trigger when 50% or more of the surface area of either element overlaps) or a number of pixels (20 would only trigger when 20 pixels or more overlap), or 0 will trigger when any part of the two elements overlap.
      const overlapThreshold = "50%";

      let parentCard;

      Draggable.create(droppables, {
        bounds: window,
        onDrag: function(e) {
          if (this.hitTest(dropTarget, overlapThreshold)) {
            const target = $(this.target);
            parentCard = target.closest('.card');
            // this occurs when dropping target into drop area
            if (!target.hasClass("bad-food")) {
              dropContainer.addClass("panda-mouth-open");
              dropContainer.removeClass("panda-bad");
            } else {
              dropContainer.addClass("panda-bad");
              dropContainer.removeClass("panda-mouth-open");
            }
          }
        },
        onDragEnd: function(e) {
          if ($(this.target)|| !this.hitTest(dropTarget, overlapThreshold)) {
            //if there isn't a bad-food, send it back to starting position
            TweenLite.to(this.target, 0.2, {
              x: 0,
              y: 0
            });
          }
          flipCard(parentCard);
        },
      });
    }

    function onSliding() {
      // during carousel sliding event remove overflow-visible class, remove flipped class on cards
      if (carouselInner.hasClass("overflow-visible")) {
        carouselInner.removeClass("overflow-visible");
      }
      if (cards.hasClass("flipped")) {
        cards.removeClass("flipped");
      }
    }

    function onSlid() {
      // after carousel sliding event concludes, add class overflow-visible
      if (!carouselInner.hasClass("overflow-visible")) {
        carouselInner.addClass("overflow-visible");
      }
    }

    // events
    cards.on("click", onCardClick);
    carousel.on('slide.bs.carousel', onSliding);
    carousel.on('slid.bs.carousel', onSlid);

    // inits
    initDraggable();
});
