'use client';

import { useEffect, useState } from 'react';
import { investApi } from '@/src/lib/api';
import { Button, DatePicker, Dialog, Form, Input, List, NavBar, Toast } from 'antd-mobile';

interface InvestItem {
  id: string;
  amount: string | number;
  description: string;
  date?: string;
}

const NumberInput = ({ value, onChange, ...props }: any) => {
  const handleChange = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '');
    const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    onChange?.(formatted);
  };
  return <Input value={value} onChange={handleChange} inputMode='numeric' {...props} />;
};

export default function InvestPage() {
  const [list, setList] = useState<InvestItem[]>([]);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const refresh = () => investApi.getAll().then(setList).catch(() => Toast.show({ content: '백엔드 서버를 확인하세요!', icon: 'fail' }));

  useEffect(() => { refresh(); }, []);

  const onFinish = async (values: { amount: string; description: string; date?: Date }) => {
    const amountStr = values.amount ? String(values.amount).replace(/,/g, '') : '0';
    const payload = { ...values, amount: Number(amountStr), date: values.date?.toISOString() };
    try {
      if (isEdit && editId) {
        await investApi.update(editId, payload);
        Toast.show({ content: '수정되었습니다.', icon: 'success' });
      } else {
        await investApi.create(payload);
        Toast.show({ content: '등록되었습니다.', icon: 'success' });
      }
      form.resetFields();
      setIsEdit(false);
      setEditId(null);
      refresh();
    } catch (error) {
      Toast.show({ content: '오류가 발생했습니다.', icon: 'fail' });
    }
  };

  const handleEdit = (item: InvestItem) => {
    setIsEdit(true);
    setEditId(item.id);
    form.setFieldsValue({
      amount: Number(item.amount).toLocaleString(),
      description: item.description,
      date: item.date ? new Date(item.date) : null,
    });
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditId(null);
    form.resetFields();
  };

  const handleDelete = async (id: string) => {
    const result = await Dialog.confirm({
      content: '정말 삭제하시겠습니까?',
    });
    if (result) {
      await investApi.delete(id);
      Toast.show({ content: '삭제되었습니다.', icon: 'success' });
      refresh();
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <NavBar back={null} style={{ background: '#fff' }}>투자 내역 관리 (AIP)</NavBar>

      <div className="p-4">
        <Form
          form={form}
          onFinish={onFinish}
          layout='horizontal'
          footer={
            <div className="flex gap-2">
              <Button block type='submit' color='primary' size='large'>
                {isEdit ? '수정' : '등록'}
              </Button>
              {isEdit && (
                <Button block onClick={handleCancel} size='large'>
                  취소
                </Button>
              )}
            </div>
          }
          mode='card'
        >
          <Form.Header>투자 정보 입력</Form.Header>
          <Form.Item
            name='amount'
            label='금액'
            rules={[{ required: true, message: '금액을 입력해주세요' }]}
          >
            <NumberInput placeholder='금액을 입력하세요' />
          </Form.Item>
          <Form.Item
            name='date'
            label='날짜'
            trigger='onConfirm'
            onClick={() => setPickerVisible(true)}
          >
            <DatePicker
              visible={pickerVisible}
              onClose={() => setPickerVisible(false)}
              confirmText='확인'
              cancelText='취소'
              placeholder='날짜를 선택해주세요'
            >
              {(value: Date | null) => value ? value.toLocaleDateString() : '날짜를 선택해주세요'}

            </DatePicker>
          </Form.Item>
        </Form>

        <div className="mt-4">
          <List header='투자 목록' mode='card'>
            {list.map((item) => (
              <List.Item
                key={item.id}
                description={
                  <div>
                    {item.date && <span className="mr-2">{new Date(item.date).toLocaleDateString()}</span>}
                    <span>{item.description}</span>
                  </div>
                }
                extra={
                  <div className="flex gap-2">
                    <Button size='mini' color='primary' fill='outline' onClick={() => handleEdit(item)}>
                      수정
                    </Button>
                    <Button size='mini' color='danger' fill='outline' onClick={() => handleDelete(item.id)}>
                      삭제
                    </Button>
                  </div>
                }
              >
                {Number(item.amount).toLocaleString()}원
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
