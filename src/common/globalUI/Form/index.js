/*
 * @Author: objectivezt
 * @Date: 2020-09-06 16:46:58
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 20:28:43
 */

import React, { Component } from 'react';
import { Form, Row, Col, Select, Input, DatePicker, Button } from 'antd';
import PropTypes from 'prop-types';
import { globalSelectProps, globalDateFormat, globalFormItemBox } from '@common/config';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const localFormItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};
const localColProps = {
  sm: 24,
  md: 12,
  lg: 8,
  xl: 6,
  xxl: 6
};

/**
 * @description 全局表格组件
 * @param { Function } onRefCommonRef 上游引用
 * @param { Boolean } isFilterCollapse 是否折叠
 * @param { Number } spanNumber 默认Col间距
 * @param { Array<Item> } formItemArray 表单项
 *  @eg Item
 *    Item @param { String } formType 渲染类型 input | select | rangePicker | datePicker | customize
 *    Item @param { String } labelName 标题名称
 *    Item @param { String } keyName key
 *    Item @param { String } initialValue 初始化值
 *    Item @param { String } placeholder 控件默认值
 *    Item @param { String } selectName 下拉选择名称
 *    Item @param { String } selectValue 下拉选择值
 *    Item @param { Array } selectArray <selectName,selectValue> 下拉选择值
 *    Item @param { Function } changeCallback 操作回调
 *    Item @param { String } keyStart 日期状态下起期
 *    Item @param { String } keyEnd 日期状态下止期
 *    Item @param { ReactNode } component 自定义组件
 *    Item @param { Object } payloadObj 传参
 *    Item @param { Boolean } required 校验展示
 * @eg formItemArray: [
   @——————————{
   @————————————formType: 'input',
   @————————————labelName: '标签名称',
   @————————————keyName: 'labelName',
   @————————————initialValue: '',
   @————————————placeholder: '',
   @————————————required: false
   @——————————},
   @——————————{
   @————————————formType: 'select',
   @————————————labelName: '标签类型',
   @————————————keyName: 'labelType',
   @————————————initialValue: '',
   @————————————selectArray: [
   @————————————{ name: '一', id: '1' },
   @————————————{ name: '二', id: '2' }
   @————————————],
   @————————————selectName: 'name',
   @————————————selectValue: 'id',
   @————————————changeCallBack: () => {}
   @——————————},
   @——————————{
   @————————————formType: 'rangePicker',
   @————————————labelName: '时间范围选择',
   @————————————keyName: 'keyOne',
   @————————————initialValue: null,
   @————————————keyStart: 'dateStart',
   @————————————keyEnd: 'dateEnd'
   @——————————},
   @——————————{
   @————————————formType: 'datePicker',
   @————————————labelName: '时间选择',
   @————————————keyName: 'keyOne',
   @————————————initialValue: null
   @——————————},
   @——————————{
   @————————————formType: 'customize',
   @————————————labelName: '自定义',
   @————————————keyName: '自定义名称',
   @————————————initialValue: null
   @——————————}
 * @param {Array} buttonArray 按钮组
 *  @eg buttonArray: [
  @--------{
  @----------iconType: 'search',
  @----------typeName: '',
  @----------btnName: '查询',
  @----------clickCallBack: this.searchFunc
  @--------},
  @--------{
  @----------iconType: 'reload',
  @----------typeName: '',
  @----------btnName: '重置',
  @----------clickCallBack: this.resetFunc
  @--------},
  @--------{
  @----------iconType: 'export',
  @----------typeName: '',
  @----------btnName: '导出',
  @----------clickCallBack: this.exportFunc
  @--------},
      ]
 */

@Form.create()
export default class GlobalForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    formItemArray: PropTypes.array,
    buttonArray: PropTypes.array,
    formItemList: PropTypes.array,
    buttonList: PropTypes.array,
    spanNumber: PropTypes.any,
    onRefCommonRef: PropTypes.func,
    onRefGlobalRef: PropTypes.func
  };

  static defaultProps = {
    form: {},
    formItemList: [],
    buttonList: [],
    formItemArray: [],
    buttonArray: [],
    spanNumber: null,
    onRefCommonRef: () => {},
    onRefGlobalRef: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isFilterCollapse: false
    };
  }

  componentDidMount() {
    this.props.onRefCommonRef(this);
    this.props.onRefGlobalRef(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isFilterCollapse } = this.props;
    if (nextProps.isFilterCollapse !== isFilterCollapse) {
      this.setState({
        isFilterCollapse: nextProps.isFilterCollapse
      });
    }
  }

  getFormData = () => {
    const formData = {};
    const { form, formItemArray } = this.props;
    formItemArray.forEach(({ formType, keyName, keyStart, keyEnd }, index, array) => {
      if (formType === 'input') {
        formData[keyName] = this.trimFormItem(form.getFieldValue(keyName));
      } else if (formType === 'select' && formType === 'customize') {
        formData[keyName] = form.getFieldValue(keyName);
      } else if (formType === 'rangePicker') {
        const tempDate = form.getFieldValue(keyName) || null;
        if (tempDate && tempDate instanceof Array) {
          formData[keyStart] = moment(tempDate[0]).format(globalDateFormat);
          formData[keyEnd] = moment(tempDate[1]).format(globalDateFormat);
        }
      } else if (formType === 'datePicker') {
        const tempDate = form.getFieldValue(keyName) || null;
        if (tempDate) {
          formData[keyName] = moment(tempDate).format(globalDateFormat);
        }
      }
    });
    return formData;
  };

  /**
   * @description 删除输入的空白
   * @param {String} value
   */
  trimFormItem = value => (value ? String(name).trim() : '');

  /**
   * @description 清空所有已输入的form数据
   */
  getFormReset = () => {
    this.props.form.resetFields();
  };

  /**
   * @description 清空所有已输入的form数据
   */
  resetFormItem = () => {
    this.props.form.resetFields();
  };

  /**
   * @description 设置表单数据
   * @param {Object} formData
   */
  setFormData = formData => {
    this.props.form.setFieldsValue(formData);
  };

  /**
   * @description formItem项变化事件
   * @param { Object } e 默认事件
   * @param { String } key formItem 标示
   */
  onSelectChange = (e, key) => {
    const { formItemArray } = this.props;
    const tempArray = formItemArray.filter(item => item.keyName === key);
    if (tempArray && tempArray.length) {
      const { changeCallback } = tempArray[0];
      if (changeCallback && typeof changeCallback === 'function') {
        changeCallback(e);
      }
    }
  };

  /**
   * @description 时间可选事件
   * @param {*} e 默认事件
   * @param { String } key formItem 标示
   */
  disableDate = (e, key) => {
    const { formItemArray, form } = this.props;
    const tempArray = formItemArray.filter(item => item.keyName === key);
    if (tempArray && tempArray.length) {
      const { disabledDateCallBack } = tempArray[0];
      if (disabledDateCallBack && typeof disabledDateCallBack === 'function') {
        return disabledDateCallBack(e, form);
      }
      return false;
    }
    return false;
  };

  render() {
    const { form, formItemArray, buttonList, spanNumber } = this.props;
    const { isFilterCollapse } = this.state;
    const { getFieldDecorator } = form;
    const FormItemContainers = (
      <Row style={isFilterCollapse ? { height: '100%' } : { height: '80px', overflow: 'hidden' }}>
        {formItemArray.map(
          ({
            formType,
            labelName,
            keyName,
            initialValue = '',
            selectArray = [],
            selectName,
            selectValue,
            placeholder = '',
            component: Comp,
            payloadObj,
            required = false
          }) => {
            let formItemComponent;
            if (formType === 'input') {
              formItemComponent = (
                <FormItem
                  {...localFormItemLayout}
                  {...globalFormItemBox}
                  label={labelName}
                  required={required}>
                  {getFieldDecorator(`${keyName}`, {
                    initialValue: initialValue || undefined
                  })(<Input placeholder={placeholder} />)}
                </FormItem>
              );
            } else if (formType === 'select') {
              formItemComponent = (
                <FormItem
                  {...localFormItemLayout}
                  {...globalFormItemBox}
                  label={labelName}
                  required={required}>
                  {getFieldDecorator(`${keyName}`, {
                    initialValue: initialValue || undefined
                  })(
                    <Select
                      {...globalSelectProps}
                      onChange={e => this.onSelectChange(e, `${keyName}`)}
                      style={{ width: '100%' }}>
                      {selectArray.map(item => (
                        <Option
                          title={item[`${selectName}`]}
                          value={item[`${selectValue}`]}
                          key={item[`${selectName}`]}>
                          {item[`${selectName}`]}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              );
            } else if (formType === 'rangePicker') {
              formItemComponent = (
                <FormItem
                  {...localFormItemLayout}
                  {...globalFormItemBox}
                  label={labelName}
                  required={required}>
                  {getFieldDecorator(`${keyName}`, {
                    initialValue: initialValue || undefined
                  })(<RangePicker format={globalDateFormat} style={{ width: '100%' }} />)}
                </FormItem>
              );
            } else if (formType === 'datePicker') {
              formItemComponent = (
                <FormItem
                  {...localFormItemLayout}
                  {...globalFormItemBox}
                  label={labelName}
                  required={required}>
                  {getFieldDecorator(`${keyName}`, {
                    initialValue: initialValue || undefined
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      format={globalDateFormat}
                      disabledDate={e => this.disableDate(e, `${keyName}`)}
                    />
                  )}
                </FormItem>
              );
            } else if (formType === 'customize') {
              formItemComponent = (
                <FormItem
                  {...localFormItemLayout}
                  {...globalFormItemBox}
                  label={labelName}
                  required={required}>
                  {getFieldDecorator(`${keyName}`, {
                    initialValue: initialValue || undefined
                  })(<Comp payloadObj={payloadObj} style={{ width: '100%' }} />)}
                </FormItem>
              );
            }

            return (
              <Col span={spanNumber} {...localColProps} key={`${keyName}`}>
                {formItemComponent}
              </Col>
            );
          }
        )}
      </Row>
    );
    return (
      <Form>
        <Row>
          {spanNumber ? (
            <>{FormItemContainers}</>
          ) : (
            <Col sm={24} md={16} lg={18} xl={18} xll={18}>
              {FormItemContainers}
            </Col>
          )}
          <Col sm={24} md={8} lg={6} xl={6} xll={6}>
            <Row style={{ marginTop: '40px' }}>
              <Col style={{ float: 'right' }}>
                {buttonArray.map(({ btnName, iconType, clickCallBack, typeName }, index) => (
                  <Button
                    style={index !== 0 ? { marginLeft: '10px' } : {}}
                    icon={iconType}
                    onClick={clickCallBack}
                    type={typeName}
                    key={`${btnName}`}>
                    {btnName}
                  </Button>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}
