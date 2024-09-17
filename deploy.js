require('dotenv').config();
const algosdk = require('algosdk');
const algokit = require('@algorandfoundation/algokit-utils');
// Configuración de Algorand y Algokit
const algodToken = process.env.ALGOD_TOKEN;
const algodServer = process.env.ALGOD_SERVER;
const algodPort = process.env.ALGOD_PORT;

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

let deployContract = async () => {
    const account = algosdk.mnemonicToSecretKey(process.env.DEPLOYER_MNEMONIC);

    const client = algokit.getAppClient({
        sender: account,
        resolveBy: 'id',
        id: 0,
        app: APP_SPEC()
    }, algodClient);
    console.log("/*")
    const app = await client.create({ method: 'createApplication()void', methodArgs: [] });
    await client.fundAppAccount(algokit.microAlgos(250_000));
    console.log("*/")
    console.log('// eslint-disable-next-line import/no-anonymous-default-export');
    console.log('export default ', app.appId);
    //return app;
}

let APP_SPEC =  () => {
return {
  "hints": {
    "createApplication()void": {
      "call_config": {
        "no_op": "CREATE"
      }
    },
    "reigsterCandidate(address,string,string,string,string)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "vote(address)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "getVotes(address)(string,string,string,string,uint8)": {
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "bare_call_config": {
    "no_op": "NEVER",
    "opt_in": "NEVER",
    "close_out": "NEVER",
    "update_application": "NEVER",
    "delete_application": "NEVER"
  },
  "schema": {
    "local": {
      "declared": {},
      "reserved": {}
    },
    "global": {
      "declared": {
        "owner": {
          "type": "bytes",
          "key": "owner"
        }
      },
      "reserved": {}
    }
  },
  "state": {
    "global": {
      "num_byte_slices": 1,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgovLyBUaGlzIFRFQUwgd2FzIGdlbmVyYXRlZCBieSBURUFMU2NyaXB0IHYwLjEwMC4yCi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvcmFuZGZvdW5kYXRpb24vVEVBTFNjcmlwdAoKLy8gVGhpcyBjb250cmFjdCBpcyBjb21wbGlhbnQgd2l0aCBhbmQvb3IgaW1wbGVtZW50cyB0aGUgZm9sbG93aW5nIEFSQ3M6IFsgQVJDNCBdCgovLyBUaGUgZm9sbG93aW5nIHRlbiBsaW5lcyBvZiBURUFMIGhhbmRsZSBpbml0aWFsIHByb2dyYW0gZmxvdwovLyBUaGlzIHBhdHRlcm4gaXMgdXNlZCB0byBtYWtlIGl0IGVhc3kgZm9yIGFueW9uZSB0byBwYXJzZSB0aGUgc3RhcnQgb2YgdGhlIHByb2dyYW0gYW5kIGRldGVybWluZSBpZiBhIHNwZWNpZmljIGFjdGlvbiBpcyBhbGxvd2VkCi8vIEhlcmUsIGFjdGlvbiByZWZlcnMgdG8gdGhlIE9uQ29tcGxldGUgaW4gY29tYmluYXRpb24gd2l0aCB3aGV0aGVyIHRoZSBhcHAgaXMgYmVpbmcgY3JlYXRlZCBvciBjYWxsZWQKLy8gRXZlcnkgcG9zc2libGUgYWN0aW9uIGZvciB0aGlzIGNvbnRyYWN0IGlzIHJlcHJlc2VudGVkIGluIHRoZSBzd2l0Y2ggc3RhdGVtZW50Ci8vIElmIHRoZSBhY3Rpb24gaXMgbm90IGltcGxlbWVudGVkIGluIHRoZSBjb250cmFjdCwgaXRzIHJlc3BlY3RpdmUgYnJhbmNoIHdpbGwgYmUgIipOT1RfSU1QTEVNRU5URUQiIHdoaWNoIGp1c3QgY29udGFpbnMgImVyciIKdHhuIEFwcGxpY2F0aW9uSUQKIQppbnQgNgoqCnR4biBPbkNvbXBsZXRpb24KKwpzd2l0Y2ggKmNhbGxfTm9PcCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKmNyZWF0ZV9Ob09wICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRAoKKk5PVF9JTVBMRU1FTlRFRDoKCS8vIFRoZSByZXF1ZXN0ZWQgYWN0aW9uIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiB0aGlzIGNvbnRyYWN0LiBBcmUgeW91IHVzaW5nIHRoZSBjb3JyZWN0IE9uQ29tcGxldGU/IERpZCB5b3Ugc2V0IHlvdXIgYXBwIElEPwoJZXJyCgovLyBjcmVhdGVBcHBsaWNhdGlvbigpdm9pZAoqYWJpX3JvdXRlX2NyZWF0ZUFwcGxpY2F0aW9uOgoJLy8gZXhlY3V0ZSBjcmVhdGVBcHBsaWNhdGlvbigpdm9pZAoJY2FsbHN1YiBjcmVhdGVBcHBsaWNhdGlvbgoJaW50IDEKCXJldHVybgoKLy8gY3JlYXRlQXBwbGljYXRpb24oKTogdm9pZApjcmVhdGVBcHBsaWNhdGlvbjoKCXByb3RvIDAgMAoKCS8vIGNvbnRyYWN0cy9Wb3RhdGlvbnMuYWxnby50czoxMgoJLy8gdGhpcy5vd25lci52YWx1ZSA9IHRoaXMuYXBwLmNyZWF0b3IKCWJ5dGUgMHg2Zjc3NmU2NTcyIC8vICJvd25lciIKCXR4bmEgQXBwbGljYXRpb25zIDAKCWFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKCXBvcAoJYXBwX2dsb2JhbF9wdXQKCXJldHN1YgoKLy8gcmVpZ3N0ZXJDYW5kaWRhdGUoYWRkcmVzcyxzdHJpbmcsc3RyaW5nLHN0cmluZyxzdHJpbmcpdm9pZAoqYWJpX3JvdXRlX3JlaWdzdGVyQ2FuZGlkYXRlOgoJLy8gcGhvbmU6IHN0cmluZwoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQoJZXh0cmFjdCAyIDAKCgkvLyBlbWFpbDogc3RyaW5nCgl0eG5hIEFwcGxpY2F0aW9uQXJncyA0CglleHRyYWN0IDIgMAoKCS8vIGxhc3ROYW1lOiBzdHJpbmcKCXR4bmEgQXBwbGljYXRpb25BcmdzIDMKCWV4dHJhY3QgMiAwCgoJLy8gZmlzdE5hbWU6IHN0cmluZwoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgoJZXh0cmFjdCAyIDAKCgkvLyBhZGRyZXNzOiBhZGRyZXNzCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglkdXAKCWxlbgoJaW50IDMyCgk9PQoKCS8vIGFyZ3VtZW50IDQgKGFkZHJlc3MpIGZvciByZWlnc3RlckNhbmRpZGF0ZSBtdXN0IGJlIGEgYWRkcmVzcwoJYXNzZXJ0CgoJLy8gZXhlY3V0ZSByZWlnc3RlckNhbmRpZGF0ZShhZGRyZXNzLHN0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZyl2b2lkCgljYWxsc3ViIHJlaWdzdGVyQ2FuZGlkYXRlCglpbnQgMQoJcmV0dXJuCgovLyByZWlnc3RlckNhbmRpZGF0ZShhZGRyZXNzOiBBZGRyZXNzLCBmaXN0TmFtZTogc3RyaW5nLCBsYXN0TmFtZTogc3RyaW5nLCBlbWFpbDogc3RyaW5nLCBwaG9uZTogc3RyaW5nKTogdm9pZApyZWlnc3RlckNhbmRpZGF0ZToKCXByb3RvIDUgMAoKCS8vIGNvbnRyYWN0cy9Wb3RhdGlvbnMuYWxnby50czoxNwoJLy8gYXNzZXJ0KHRoaXMub3duZXIudmFsdWUgPT09IHRoaXMudHhuLnNlbmRlciwgJ09ubHkgdGhlIG93bmVyIGNhbiByZWdpc3RlciBhIGNhbmRpZGF0ZScpCglieXRlIDB4NmY3NzZlNjU3MiAvLyAib3duZXIiCglhcHBfZ2xvYmFsX2dldAoJdHhuIFNlbmRlcgoJPT0KCgkvLyBPbmx5IHRoZSBvd25lciBjYW4gcmVnaXN0ZXIgYSBjYW5kaWRhdGUKCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9Wb3RhdGlvbnMuYWxnby50czoxOAoJLy8gYXNzZXJ0KCF0aGlzLmRhdGFDYW5kaWRhdGUoYWRkcmVzcykuZXhpc3RzLCAnVGhlIGNhbmRpZGF0ZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQnKQoJZnJhbWVfZGlnIC0xIC8vIGFkZHJlc3M6IEFkZHJlc3MKCWJveF9sZW4KCXN3YXAKCXBvcAoJIQoKCS8vIFRoZSBjYW5kaWRhdGUgaXMgYWxyZWFkeSByZWdpc3RlcmVkCglhc3NlcnQKCgkvLyBjb250cmFjdHMvVm90YXRpb25zLmFsZ28udHM6MTkKCS8vIHRoaXMuZGF0YUNhbmRpZGF0ZShhZGRyZXNzKS52YWx1ZSA9IHsKCS8vICAgICAgIGZpc3ROYW1lOiBmaXN0TmFtZSwKCS8vICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSwKCS8vICAgICAgIGVtYWlsOiBlbWFpbCwKCS8vICAgICAgIHBob25lOiBwaG9uZSwKCS8vICAgICAgIHZvdGVzOiAwLAoJLy8gICAgIH0KCWZyYW1lX2RpZyAtMSAvLyBhZGRyZXNzOiBBZGRyZXNzCglkdXAKCWJveF9kZWwKCXBvcAoJYnl0ZSAweCAvLyBpbml0aWFsIGhlYWQKCWJ5dGUgMHggLy8gaW5pdGlhbCB0YWlsCglieXRlIDB4MDAwOSAvLyBpbml0aWFsIGhlYWQgb2Zmc2V0CglmcmFtZV9kaWcgLTIgLy8gZmlzdE5hbWU6IHN0cmluZwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgKnByb2Nlc3NfZHluYW1pY190dXBsZV9lbGVtZW50CglmcmFtZV9kaWcgLTMgLy8gbGFzdE5hbWU6IHN0cmluZwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgKnByb2Nlc3NfZHluYW1pY190dXBsZV9lbGVtZW50CglmcmFtZV9kaWcgLTQgLy8gZW1haWw6IHN0cmluZwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgKnByb2Nlc3NfZHluYW1pY190dXBsZV9lbGVtZW50CglmcmFtZV9kaWcgLTUgLy8gcGhvbmU6IHN0cmluZwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWNhbGxzdWIgKnByb2Nlc3NfZHluYW1pY190dXBsZV9lbGVtZW50CglieXRlIDB4MDAKCWNhbGxzdWIgKnByb2Nlc3Nfc3RhdGljX3R1cGxlX2VsZW1lbnQKCXBvcCAvLyBwb3AgaGVhZCBvZmZzZXQKCWNvbmNhdCAvLyBjb25jYXQgaGVhZCBhbmQgdGFpbAoJYm94X3B1dAoJcmV0c3ViCgovLyB2b3RlKGFkZHJlc3Mpdm9pZAoqYWJpX3JvdXRlX3ZvdGU6CgkvLyBjYW5kaWRhdGU6IGFkZHJlc3MKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWR1cAoJbGVuCglpbnQgMzIKCT09CgoJLy8gYXJndW1lbnQgMCAoY2FuZGlkYXRlKSBmb3Igdm90ZSBtdXN0IGJlIGEgYWRkcmVzcwoJYXNzZXJ0CgoJLy8gZXhlY3V0ZSB2b3RlKGFkZHJlc3Mpdm9pZAoJY2FsbHN1YiB2b3RlCglpbnQgMQoJcmV0dXJuCgovLyB2b3RlKGNhbmRpZGF0ZTogQWRkcmVzcyk6IHZvaWQKdm90ZToKCXByb3RvIDEgMAoKCS8vIGNvbnRyYWN0cy9Wb3RhdGlvbnMuYWxnby50czozMAoJLy8gYXNzZXJ0KHRoaXMuZGF0YUNhbmRpZGF0ZShjYW5kaWRhdGUpLmV4aXN0cywgJ0NhbmRpdGFlIG5vIHJlZ2lzdGVyZWQnKQoJZnJhbWVfZGlnIC0xIC8vIGNhbmRpZGF0ZTogQWRkcmVzcwoJYm94X2xlbgoJc3dhcAoJcG9wCgoJLy8gQ2FuZGl0YWUgbm8gcmVnaXN0ZXJlZAoJYXNzZXJ0CgoJLy8gY29udHJhY3RzL1ZvdGF0aW9ucy5hbGdvLnRzOjMxCgkvLyB0aGlzLmRhdGFDYW5kaWRhdGUoY2FuZGlkYXRlKS52YWx1ZS52b3RlcyA9IHRoaXMuZGF0YUNhbmRpZGF0ZShjYW5kaWRhdGUpLnZhbHVlLnZvdGVzICsgMQoJZnJhbWVfZGlnIC0xIC8vIGNhbmRpZGF0ZTogQWRkcmVzcwoJYm94X2dldAoKCS8vIGJveCB2YWx1ZSBkb2VzIG5vdCBleGlzdDogdGhpcy5kYXRhQ2FuZGlkYXRlKGNhbmRpZGF0ZSkudmFsdWUKCWFzc2VydAoJc3RvcmUgMjU1IC8vIGZ1bGwgYXJyYXkKCWxvYWQgMjU1IC8vIGZ1bGwgYXJyYXkKCWludCA4CglmcmFtZV9kaWcgLTEgLy8gY2FuZGlkYXRlOiBBZGRyZXNzCglib3hfZ2V0CgoJLy8gYm94IHZhbHVlIGRvZXMgbm90IGV4aXN0OiB0aGlzLmRhdGFDYW5kaWRhdGUoY2FuZGlkYXRlKS52YWx1ZQoJYXNzZXJ0CglzdG9yZSAyNTUgLy8gZnVsbCBhcnJheQoJbG9hZCAyNTUgLy8gZnVsbCBhcnJheQoJZXh0cmFjdCA4IDEKCWJ0b2kKCWludCAxCgkrCglpdG9iCglkdXAKCWJpdGxlbgoJaW50IDgKCTw9CgoJLy8gdGhpcy5kYXRhQ2FuZGlkYXRlKGNhbmRpZGF0ZSkudmFsdWUudm90ZXMgKyAxIG92ZXJmbG93ZWQgOCBiaXRzCglhc3NlcnQKCWV4dHJhY3QgNyAxCglyZXBsYWNlMwoJZnJhbWVfZGlnIC0xIC8vIGNhbmRpZGF0ZTogQWRkcmVzcwoJZHVwCglib3hfZGVsCglwb3AKCXN3YXAKCWJveF9wdXQKCXJldHN1YgoKLy8gZ2V0Vm90ZXMoYWRkcmVzcykoc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nLHVpbnQ4KQoqYWJpX3JvdXRlX2dldFZvdGVzOgoJLy8gVGhlIEFCSSByZXR1cm4gcHJlZml4CglieXRlIDB4MTUxZjdjNzUKCgkvLyBjYW5kaWRhdGU6IGFkZHJlc3MKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWR1cAoJbGVuCglpbnQgMzIKCT09CgoJLy8gYXJndW1lbnQgMCAoY2FuZGlkYXRlKSBmb3IgZ2V0Vm90ZXMgbXVzdCBiZSBhIGFkZHJlc3MKCWFzc2VydAoKCS8vIGV4ZWN1dGUgZ2V0Vm90ZXMoYWRkcmVzcykoc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nLHVpbnQ4KQoJY2FsbHN1YiBnZXRWb3RlcwoJY29uY2F0Cglsb2cKCWludCAxCglyZXR1cm4KCi8vIGdldFZvdGVzKGNhbmRpZGF0ZTogQWRkcmVzcyk6IENhbmRpZGF0ZUluZm8KZ2V0Vm90ZXM6Cglwcm90byAxIDEKCgkvLyBjb250cmFjdHMvVm90YXRpb25zLmFsZ28udHM6MzUKCS8vIHJldHVybiB0aGlzLmRhdGFDYW5kaWRhdGUoY2FuZGlkYXRlKS52YWx1ZTsKCWZyYW1lX2RpZyAtMSAvLyBjYW5kaWRhdGU6IEFkZHJlc3MKCWJveF9nZXQKCgkvLyBib3ggdmFsdWUgZG9lcyBub3QgZXhpc3Q6IHRoaXMuZGF0YUNhbmRpZGF0ZShjYW5kaWRhdGUpLnZhbHVlCglhc3NlcnQKCXJldHN1YgoKKmNyZWF0ZV9Ob09wOgoJbWV0aG9kICJjcmVhdGVBcHBsaWNhdGlvbigpdm9pZCIKCXR4bmEgQXBwbGljYXRpb25BcmdzIDAKCW1hdGNoICphYmlfcm91dGVfY3JlYXRlQXBwbGljYXRpb24KCgkvLyB0aGlzIGNvbnRyYWN0IGRvZXMgbm90IGltcGxlbWVudCB0aGUgZ2l2ZW4gQUJJIG1ldGhvZCBmb3IgY3JlYXRlIE5vT3AKCWVycgoKKmNhbGxfTm9PcDoKCW1ldGhvZCAicmVpZ3N0ZXJDYW5kaWRhdGUoYWRkcmVzcyxzdHJpbmcsc3RyaW5nLHN0cmluZyxzdHJpbmcpdm9pZCIKCW1ldGhvZCAidm90ZShhZGRyZXNzKXZvaWQiCgltZXRob2QgImdldFZvdGVzKGFkZHJlc3MpKHN0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZyx1aW50OCkiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCAqYWJpX3JvdXRlX3JlaWdzdGVyQ2FuZGlkYXRlICphYmlfcm91dGVfdm90ZSAqYWJpX3JvdXRlX2dldFZvdGVzCgoJLy8gdGhpcyBjb250cmFjdCBkb2VzIG5vdCBpbXBsZW1lbnQgdGhlIGdpdmVuIEFCSSBtZXRob2QgZm9yIGNhbGwgTm9PcAoJZXJyCgoqcHJvY2Vzc19zdGF0aWNfdHVwbGVfZWxlbWVudDoKCXByb3RvIDQgMwoJZnJhbWVfZGlnIC00IC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMSAvLyBlbGVtZW50Cgljb25jYXQKCWZyYW1lX2RpZyAtMyAvLyB0dXBsZSB0YWlsCglmcmFtZV9kaWcgLTIgLy8gaGVhZCBvZmZzZXQKCXJldHN1YgoKKnByb2Nlc3NfZHluYW1pY190dXBsZV9lbGVtZW50OgoJcHJvdG8gNCAzCglmcmFtZV9kaWcgLTQgLy8gdHVwbGUgaGVhZAoJZnJhbWVfZGlnIC0yIC8vIGhlYWQgb2Zmc2V0Cgljb25jYXQKCWZyYW1lX2J1cnkgLTQgLy8gdHVwbGUgaGVhZAoJZnJhbWVfZGlnIC0xIC8vIGVsZW1lbnQKCWR1cAoJbGVuCglmcmFtZV9kaWcgLTIgLy8gaGVhZCBvZmZzZXQKCWJ0b2kKCSsKCWl0b2IKCWV4dHJhY3QgNiAyCglmcmFtZV9idXJ5IC0yIC8vIGhlYWQgb2Zmc2V0CglmcmFtZV9kaWcgLTMgLy8gdHVwbGUgdGFpbAoJc3dhcAoJY29uY2F0CglmcmFtZV9idXJ5IC0zIC8vIHR1cGxlIHRhaWwKCWZyYW1lX2RpZyAtNCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTMgLy8gdHVwbGUgdGFpbAoJZnJhbWVfZGlnIC0yIC8vIGhlYWQgb2Zmc2V0CglyZXRzdWI=",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEw"
  },
  "contract": {
    "name": "Votations",
    "desc": "",
    "methods": [
      {
        "name": "createApplication",
        "args": [],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "reigsterCandidate",
        "args": [
          {
            "name": "address",
            "type": "address"
          },
          {
            "name": "fistName",
            "type": "string"
          },
          {
            "name": "lastName",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "phone",
            "type": "string"
          }
        ],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "vote",
        "args": [
          {
            "name": "candidate",
            "type": "address"
          }
        ],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "getVotes",
        "args": [
          {
            "name": "candidate",
            "type": "address"
          }
        ],
        "returns": {
          "type": "(string,string,string,string,uint8)"
        }
      }
    ]
  }
}
}


deployContract();