import React, { useState } from "react";
import {
  getValidationRules,
  toggleAllRules,
  toggleValidationRule,
} from "../services/salesforceapi";
import RuleToggle from "./ToggleRule";

const ValidationList = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deploying, setDeploying] = useState(false);

  const fetchRules = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getValidationRules();
      setRules(data);
    } catch (error) {
      setError("Failed to fetch validation rules");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (ruleId, currentStatus) => {
    try {
      await toggleValidationRule(ruleId, !currentStatus);
      setRules((prev) =>
        prev.map((rule) =>
          rule.Id === ruleId ? { ...rule, Active: !currentStatus } : rule
        )
      );
    } catch (error) {
      setError("Failed to toggle rule");
    }
  };

  const handleToggleAll = async (isActive) => {
    try {
        await toggleAllRules(rules, isActive);
        setRules((prev) => prev.map((rule) => ({...rule, Active: isActive })))
    } catch (error) {
        setError('Failed to toggle all rules')
    }
  };

  const handleDeploy = async () => {
    setDeploying(true);
    try {
        await toggleAllRules(rules, rules[0]?.Active);
        alert('Changes deployed to Salesforce successfully!')
    } catch (error) {
        setError('Deployment Failed')
    } finally {
        setDeploying(false);
    }
  };
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Validation Rules</h2>
          <p className="text-gray-400 text-sm">Manage your Salesforce Account validation rules</p>
        </div>

        {/* action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
          onClick={fetchRules}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition duration-200"
          >
            {loading ? '⏳ Fetching...' : '📥 Get Validation Rules'}
          </button>

          <button
          onClick={() => handleToggleAll(true)}
          disabled={rules.length === 0}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition duration-200"
          >
            ✅ Enable All
          </button>

          <button
          onClick={() => handleToggleAll(false)}
          disabled={rules.length === 0}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition duration-200"
          >
            ❌ Disable All
          </button>

          
          <button
          onClick={handleDeploy}
          disabled={deploying || rules.length === 0}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition duration-200"
          >
            {deploying ? '⏳ Deploying...' : '🚀 Deploy Changes'}
          </button>
        </div>

        {/* error */}
        {error && (
          <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* table */}
        {rules.length > 0 ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-gray-400 uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 text-left">#</th>
                  <th className="px-6 py-4 text-left">Rule Name</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {rules.map((rule, index) => (
                  <tr key={rule.Id} className="hover:bg-gray-700/50 transition duration-150">
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-white font-medium">{rule.ValidationName}</td>
                    <td className="px-6 py-4 text-gray-400">{rule.Description || 'No Description'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rule.Active
                          ? 'bg-green-900/50 text-green-400 border border-green-700'
                          : 'bg-red-900/50 text-red-400 border border-red-700'
                      }`}>
                      {rule.Active ? '● Active' : '● Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <RuleToggle 
                      isActive={rule.Active}
                      onToggle={() => handleToggle(rule.Id, rule.Active)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-4xl mb-4">📋</p>
              <p className="text-lg">No rules loaded yet</p>
              <p className="text-sm mt-1">Click "Get Validation Rules" to fetch from Salesforce</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ValidationList;
