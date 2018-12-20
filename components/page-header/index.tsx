import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import { BreadcrumbProps } from '../breadcrumb';
import { Divider, Breadcrumb } from '../index';
import Tag from '../tag';

export interface IPageHeaderProps {
  prefixCls: string;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  style: React.CSSProperties;
  breadcrumb: BreadcrumbProps;
  tags: Tag[] | Tag;
  footer: React.ReactNode;
  onBack: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface IPageHeaderState {}

class PageHeader extends React.PureComponent<Partial<IPageHeaderProps>, IPageHeaderState> {
  renderBack(prefixCls: string) {
    return (
      <>
        <Icon
          type="arrow-left"
          onClick={e => {
            if (this.props.onBack) {
              this.props.onBack(e);
              return;
            }
            history.back();
          }}
          className={`${prefixCls}-back-icon`}
        />
        <Divider type="vertical" />
      </>
    );
  }

  renderBreadcrumb() {
    const { breadcrumb } = this.props;
    return (
      <>
        <Breadcrumb {...breadcrumb} />
      </>
    );
  }

  renderHeader(prefixCls: string) {
    const { breadcrumb } = this.props;
    if (breadcrumb && breadcrumb.routes && breadcrumb.routes.length > 2) {
      return this.renderBreadcrumb();
    }
    return this.renderBack(prefixCls);
  }

  renderTitle(prefixCls: string) {
    const { title, subTitle, tags } = this.props;
    return (
      <div className={`${prefixCls}-title-view`}>
        <span className={`${prefixCls}-title`}>{title}</span>
        {subTitle && <span className={`${prefixCls}-sub-title`}>{subTitle}</span>}
        {tags && <span className={`${prefixCls}-tags`}>{tags}</span>}
      </div>
    );
  }

  renderFooter(prefixCls: string) {
    if (this.props.footer) {
      return <div className={`${prefixCls}-footer`}>{this.props.footer}</div>;
    }
    return null;
  }

  render() {
    return (
      <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => {
          const { prefixCls: customizePrefixCls, style } = this.props;
          const prefixCls = getPrefixCls('pageheader', customizePrefixCls);
          return (
            <div className={prefixCls} style={style}>
              {this.renderHeader(prefixCls)}
              {this.renderTitle(prefixCls)}
              {this.props.children && (
                <div className={`${prefixCls}-content-view`}>{this.props.children}</div>
              )}
              {this.renderFooter(prefixCls)}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default PageHeader;
