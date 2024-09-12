import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, StatusBar } from 'react-native';
import ShippingModal from '@/components/shippingModal'; // 确保路径正确

const ParentComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shippingData, setShippingData] = useState({
    address: '深圳市宝安区XX街道XX小区',
    wuliu: '',
    wuliuCode: '',
    phone: '13800000000',
    person: '张三',
  });
  const [scannedCode, setScannedCode] = useState<string | undefined>(undefined);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDataChange = (updatedData: any) => {
    setShippingData(prevData => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleScan = () => {
    // 模拟扫码功能，实际应用中需要用扫码库处理
    const newScannedCode = 'NEW_SCANNED_CODE'; // 模拟扫码结果
    setScannedCode(newScannedCode);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    console.log('确认发货，当前物流信息：', shippingData);
    // 处理发货逻辑
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.info}>当前物流信息：</Text>
      <Text style={styles.info}>物流方式: {shippingData.wuliu}</Text>
      <Text style={styles.info}>物流单号: {shippingData.wuliuCode}</Text>
      <Button title="打开物流弹窗" onPress={handleOpenModal} />

      <ShippingModal
        isVisible={isModalVisible}
        data={shippingData}
        onScan={handleScan}
        onClose={handleCloseModal}
        onDataChange={handleDataChange}
        onConfirm={handleConfirm}
        scannedCode={scannedCode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ParentComponent;
