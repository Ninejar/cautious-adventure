import React from 'react'

const LinkItem = () => {
    const styles = `
    .link_container .link_item {
      width: 80%;
      height: 120px;
      border-radius: 8px;
    }

    .bottom {
      width: 100%;
      height: 30px;
      position: relative;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 50px;
      color: white;
      border-radius: 0px 0px 8px 8px;
    }

    .link_container .link_item:nth-child(1),
    .link_container .link_item:nth-child(2),
    .link_container .link_item:nth-child(3),
    .link_container .link_item:nth-child(4) {
      position: relative;
      transition: transform 0.3s;
    }

    .link_container .link_item:nth-child(1) {
      background-color: #17A2B8;
    }

    .link_container .link_item:nth-child(1) .bottom {
      background-color: #1591A5;
    }

    .link_container .link_item:nth-child(2) {
      background-color: #FFC107;
    }

    .link_container .link_item:nth-child(2) .bottom {
      background-color: #E5AD06;
    }

    .link_container .link_item:nth-child(3) {
      background-color: #28A745;
    }

    .link_container .link_item:nth-child(3) .bottom {
      background-color: #24963E;
    }

    .link_container .link_item:nth-child(4) {
      background-color: #A7289A;
    }

    .link_container .link_item:nth-child(4) .bottom {
      background-color: #8C1E81;
    }

    .link_item_container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      padding: 2%;
      text-decoration: none;
    }

    .link_item:hover {
      transform: scale(1.02);
    }

    .link_item_header {
      font-size: 35px;
      font-weight: bold;
    }
  `;
  return (
    <div>
    <style>{styles}</style>
  </div>
  )
}

export default LinkItem