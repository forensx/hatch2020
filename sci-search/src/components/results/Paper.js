import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader, Button, Descriptions, Typography } from "antd";
import { Row, Col } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const { Paragraph } = Typography;

export class Paper extends Component {
  state = {
    bookmarked: false
  };

  onStarHover = event => {
    this.setState({ starHover: true });
  };

  getStyle = (
      this.state.bookmarked ? <StarFilled/> : <StarOutlined/>
    )

  bookmarkPaper = (
    this.state.bookmarked = !this.state.bookmarked
  )

  render() {
    let abstractRender;

    if (this.props.results.abstract) {
      abstractRender = (
        <Descriptions.Item
          span={6}
          bordered={true}
          label="Abstract"
          style={{ abstractStyle }}
        >
          {this.props.results.abstract.replace(
            /(([^\s]+\s\s*){150})(.*)/,
            "$1…"
          )}
        </Descriptions.Item>
      );
    } else {
      abstractRender = (
        <Descriptions.Item
          span={6}
          bordered={true}
          label="Abstract"
          style={{ abstractStyle }}
        >
          Abstract not found. Visit the full paper for more details.
        </Descriptions.Item>
      );
    }

    let journalRender;

    if (this.props.results.journal) {
      journalRender = (
        <Descriptions.Item label="Journal">
          {this.props.results.journal}
        </Descriptions.Item>
      );
    } else {
      journalRender = (
        <Descriptions.Item label="Journal">
          Publication journal not found.
        </Descriptions.Item>
      );
    }

    let keywordRender;



    if (this.props.results.keywords) {
      keywordRender = (
        <Descriptions.Item label="Keywords">
          {this.props.results.keywords.join(", ")}
        </Descriptions.Item>
      );
    } else {
      keywordRender = (
        <Descriptions.Item label="Keywords">
          Keywords not found
        </Descriptions.Item>
      );
    }

    return (
      <div className="PaperHeader" style={paperStyle}>
        <PageHeader
          ghost={false}
          style={pageStyle}
          title={
            <React.Fragment>
              <a
                href={this.props.results.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.results.title}
              </a>

              <Button
                type="link"
                style={{ color: "black" }}
                onCLick={this.bookmarkPaper}
              >
                {this.getStyle}
              </Button>
            </React.Fragment>
          }
          subTitle={this.props.results.authors
            .join(", ")
            .replace(/(([^\s]+\s\s*){11})(.*)/, "$1et al.")}
          extra={[
            <Button key="go_paper_button" type="primary">
              <a
                href={this.props.results.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Paper
              </a>
            </Button>
          ]}
        >
          <Descriptions size="default">{abstractRender}</Descriptions>
          <Descriptions column={3}>
            <Descriptions.Item label="Date">
              {this.props.results.pubDate.month}-
              {this.props.results.pubDate.day}-{this.props.results.pubDate.year}
            </Descriptions.Item>
            <Descriptions.Item label="Database">
              {this.props.results.database}
            </Descriptions.Item>
            {journalRender}
          </Descriptions>
          <Descriptions column={1}>{keywordRender}</Descriptions>
        </PageHeader>
      </div>
    );
  }
}

export default Paper;

Paper.propTypes = {
  results: PropTypes.object.isRequired
};

const paperStyle = {
  backgroundColor: "#f5f5f5",
  padding: "0.5% 5% 0.5% 2%"
};

const pageStyle = {
  boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 0 rgba(0, 0, 0, 0.1)"
};

const abstractStyle = {
  minWidth: "400px"
};
