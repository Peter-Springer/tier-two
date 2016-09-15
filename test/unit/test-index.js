const React = require('react');
const ReactDOM = require('react-dom');
import Application from '../../lib/components/Application';
import BudgetDisplay from '../../lib/components/BudgetInfoDisplay';
import LogPurchaseForm from '../../lib/components/LogPurchaseForm';
import HomeScreen from '../../lib/components/HomeScreen';
import Purchase from '../../lib/components/Purchase';
import PurchasesList from '../../lib/components/PurchasesList';
import SetBudget from '../../lib/components/SetBudget';
import SignInScreen from '../../lib/components/SignInScreen';
const assert = require('chai').assert;

describe('our test bundle', function() {
  it('should work', function() {
    assert.equal(true, true);
  });
});

describe('application', function() {
 it('should create an application', function() {
   assert.isObject({ Application })
 })
});

describe('Budget info display', function() {
 it('should create a budget info display', function() {
   assert.isObject({ BudgetDisplay })
 })
});

describe('log purchase', function() {
 it('should create a log of purchases', function() {
   assert.isObject({ LogPurchaseForm })
 })
});

describe('home screen', function() {
 it('should create a home screen', function() {
   assert.isObject({ HomeScreen })
 })
});

describe('purchase', function() {
 it('should create a purchase', function() {
   assert.isObject({ Purchase })
 })
});

describe('Purchase List', function() {
 it('should create a purchase list', function() {
   assert.isObject({ PurchasesList })
 })
});

describe('Set Budget', function() {
 it('should create a budget', function() {
   assert.isObject({ SetBudget })
 })
});

describe('Sign in screen', function() {
 it('should create a sign in screen', function() {
   assert.isObject({ SignInScreen })
 })
});
