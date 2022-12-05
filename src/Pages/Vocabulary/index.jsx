import React, { useState } from "react";

import HomeLayout from "../../Layouts/HomeLayout";
import CollectionItem from '../../Containers/CollectionItem'

const collectionName = "vocabularies"
const ImprovePage = () => {

  return (
    <>
      <HomeLayout>
        <CollectionItem collectionName={collectionName}/>
      </HomeLayout>
    </>
  );
};

export default ImprovePage;

