import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function withSkeleton(
  element = React.Fragment,
  isLoading = false,
  skeletonProps = {}
) {
  console.log(skeletonProps);
  return isLoading
    ? () => (
        <React.Fragment>
          <Skeleton {...skeletonProps} />
        </React.Fragment>
      )
    : () => <React.Fragment> {element}</React.Fragment>;
}
