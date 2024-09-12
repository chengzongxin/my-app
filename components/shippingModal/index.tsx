import { Icon } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';

interface ShippingModalProps {
  isVisible: boolean;
  data: {
    address: string;
    wuliu: string;
    wuliuCode: string;
    phone: string;
    person: string;
  };
  onClose: () => void;
  onScan: () => void;
  onDataChange: (updatedData: any) => void;
  onConfirm: () => void;
  scannedCode?: string; // 传入扫码数据
}

const ShippingModal: React.FC<ShippingModalProps> = ({
  isVisible,
  data,
  onClose,
  onScan,
  onDataChange,
  onConfirm,
  scannedCode,
}) => {
  const [selectedShipping, setSelectedShipping] = useState<string>(data.wuliu);
  const [manualInput, setManualInput] = useState<string>(data.wuliuCode || '');

  useEffect(() => {
    if (scannedCode) {
      setManualInput(scannedCode);
      onDataChange({ wuliuCode: scannedCode });
    }
  }, [scannedCode]);

  const handleShippingChange = (value: string) => {
    setSelectedShipping(value);
    if (value !== 'manual') {
      setManualInput(''); // Clear manual input if not using manual option
    }
    onDataChange({ wuliu: value, wuliuCode: manualInput });
  };

  const handleManualInputChange = (text: string) => {
    setManualInput(text);
    onDataChange({ wuliu: selectedShipping, wuliuCode: text });
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{`收获地址：${data.address}`}</Text>
        <Text style={styles.title}>{`收货人：${data.person}`}</Text>
        <Text style={styles.title}>{`电话：${data.phone}`}</Text>
        <RNPickerSelect
          onValueChange={handleShippingChange}
          placeholder={{ label: '请选择物流方式', value: null }}
          value={selectedShipping}
          items={[
            { label: '德邦', value: 'debang' },
            { label: '顺丰', value: 'shunfeng' },
            { label: '手动输入', value: 'manual' },
          ]}
          style={pickerSelectStyles}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.scanWrap} onPress={onScan}>
            <Icon name="qrcode" type="font-awesome" color="#fff" size={25} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="请输入单号或者点击确认扫描单号"
            value={manualInput}
            onChangeText={handleManualInputChange}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>立即发货</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    flex: 1,
  },
  scanWrap: {
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginTop: 10,
  },
});

export default ShippingModal;
