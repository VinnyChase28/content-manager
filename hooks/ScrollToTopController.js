import React, { useEffect } from "react";
import { useRouter } from "state";

// Component that attaches scroll to top hanler on router change
// renders nothing, just attaches side effects
export const ScrollToTopControlller = () => {
  // this assumes that current router state is accessed via hook
  // but it does not matter, pathname and search (or that ever) may come from props, context, etc.
  const { pathname, search } = useRouter();

  // just run the effect on pathname and/or search change
  useEffect(
    () => () => {
      // <-- Now we return the useEffect teardown effect, which will be fired only after the path/search change for the first time
      try {
        // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(0, 0);
      }
    },
    [pathname, search]
  );

  // renders nothing, since nothing is needed
  return null;
};
